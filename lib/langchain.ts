import { PineconeStore } from "@langchain/pinecone";
import { auth } from "@clerk/nextjs/server";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import pineconeClient from "./pinecone";
import { adminDb } from "./firestoreAdmin";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

export const indexName = "doctalk";

async function nameSpaceExists(
  index: Index<RecordMetadata>,
  namespace: string
) {
  if (namespace === null) throw new Error("No namespace value provided.");
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
}

async function generateDocs(docId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found!");

  console.log("Fetching the download url from the firebase...");

  const firebaseRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .get();

  const downloadUrl = firebaseRef.data()?.downloadURL;

  if (!downloadUrl) throw new Error("Download url not found!");

  console.log("Download url fetched successfully.");

  const response = await fetch(downloadUrl);
  const data = await response.blob();

  console.log("Loading PDF");
  const loader = new PDFLoader(data);
  const docs = await loader.load();

  console.log("Splitting the PDF into chunks...");
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);
  console.log("Split into parts..");
  return splitDocs;
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("User not found!");

  let pineconeVectorStore;

  console.log("Generating embeddings...");
  // const embeddings = new OpenAIEmbeddings();

  const embeddings = new GoogleGenerativeAIEmbeddings();

  const index = await pineconeClient.index(indexName);
  const namespaceAlreadyExists = await nameSpaceExists(index, userId);

  if (namespaceAlreadyExists) {
    console.log("Namespace already exists, Reusing existing embeddings...");

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: userId,
    });

    return pineconeVectorStore;
  } else {
    const splitDocs = await generateDocs(docId);

    console.log(
      `Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store...`
    );

    pineconeVectorStore = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        pineconeIndex: index,
        namespace: docId,
      }
    );

    console.log("Done everything!");
    return pineconeVectorStore;
  }
}
