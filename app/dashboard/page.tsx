import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>
              All your uploaded documents are listed here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden sm:table-cell">Pages</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Uploaded
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p className="font-medium">Medical Consultation</p>
                    <p className="hidden text-sm text-muted-foreground sm:inline">
                      PDF
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">12</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    2023-05-12
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
