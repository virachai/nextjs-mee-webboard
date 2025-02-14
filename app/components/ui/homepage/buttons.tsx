import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreatePost() {
  return (
    <Link
      href="/post/create"
      className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 h-10 font-medium text-white text-sm transition-colors btn_create_post"
    >
      <span className="hidden md:block md:mr-4">Create</span>
      <PlusIcon className="h-5" />
    </Link>
  );
}

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 h-10 font-medium text-white text-sm transition-colors"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <PlusIcon className="md:ml-4 h-5" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      key={id}
      href="/dashboard/invoices"
      className="hover:bg-gray-100 p-2 border rounded-md"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="hover:bg-gray-100 p-2 border rounded-md" key={id}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
