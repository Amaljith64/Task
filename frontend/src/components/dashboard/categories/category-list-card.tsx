import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category";
import { Folder, MoreVertical, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
};

function CategoryListCard({ category, onEdit, onDelete }: Props) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                    <div className="flex items-center space-x-2">
                        <Folder className="h-5 w-5 text-primary" />
                        <span>{category.name}</span>
                    </div>
                </CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onEdit(category)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => onDelete(category.id)}
                            className="text-destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            {category.resourceCount} resources
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {category.completedCount} completed
                        </p>
                    </div>
                    <Link href={`/dashboard/categories/${category.id}`}>
                        <Button variant="outline" size="sm">
                            View Resources <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default CategoryListCard;
