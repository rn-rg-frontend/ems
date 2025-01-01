'use client'
import { useState } from "react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    AlignJustify,
    AlignCenter,
    AlignLeft,
    AlignRight,
    ImageUp
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export default function Toolbar({ editor, content }) {
    const [openModal, setOpenModal] = useState(false);
    if (!editor) {
        return null;
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                editor.chain().focus().setImage({ src: dataUrl }).run();
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div
                className="px-4 py-3 rounded-tl-md rounded-tr-md flex items-start
    gap-5 w-full flex-wrap border border-gray-700"
            >
                <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleBold().run();
                        }}
                        className={
                            editor.isActive("bold")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Bold className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleItalic().run();
                        }}
                        className={
                            editor.isActive("italic")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Italic className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleUnderline().run();
                        }}
                        className={
                            editor.isActive("underline")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Underline className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleStrike().run();
                        }}
                        className={
                            editor.isActive("strike")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Strikethrough className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleHeading({ level: 2 }).run();
                        }}
                        className={
                            editor.isActive("heading", { level: 2 })
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Heading2 className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().setTextAlign('justify').run();
                        }}
                        className={
                            editor.isActive({ textAlign: 'justify' })
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <AlignJustify className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().setTextAlign('center').run();
                        }}
                        className={
                            editor.isActive({ textAlign: 'center' })
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <AlignCenter className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().setTextAlign('left').run();
                        }}
                        className={
                            editor.isActive({ textAlign: 'left' })
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <AlignLeft className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().setTextAlign('right').run();
                        }}
                        className={
                            editor.isActive({ textAlign: 'right' })
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <AlignRight className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleBulletList().run();
                        }}
                        className={
                            editor.isActive("bulletList")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <List className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleOrderedList().run();
                        }}
                        className={
                            editor.isActive("orderedList")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <ListOrdered className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleBlockquote().run();
                        }}
                        className={
                            editor.isActive("blockquote")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Quote className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleCode().run();
                        }}
                        className={
                            editor.isActive("code")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black"
                        }
                    >
                        <Code className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().undo().run();
                        }}
                        className={
                            editor.isActive("undo")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black hover:bg-blue-800 hover:text-white p-1 hover:rounded-lg"
                        }
                    >
                        <Undo className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().redo().run();
                        }}
                        className={
                            editor.isActive("redo")
                                ? "bg-blue-800 text-white p-2 rounded-lg"
                                : "text-black hover:bg-blue-800 hover:text-white p-1 hover:rounded-lg"
                        }
                    >
                        <Redo className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                    <div className="hover:bg-blue-800 hover:text-white  rounded-lg">
                        <Dialog>
                            <DialogTrigger asChild>
                                <ImageUp className="md:w-5 md:h-5 font-bold w-3 h-3 m-2" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] w-full">
                                <DialogHeader>
                                    <DialogTitle className='text-center'>Uplod Image</DialogTitle>
                                </DialogHeader>
                                <form className="w-full ">
                                    

                                    <input className="block w-full text-sm p-2 text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                         />

                                </form>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

            </div>
        </>
    );
};
