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

export default function Toolbar({ editor, content }) {
    const [openModal, setOpenModal] = useState(false);
    if (!editor) {
        return null;
    }
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
                    <button className="bg-blue-800 text-white p-2 rounded-lg">
                        <ImageUp className="md:w-5 md:h-5 font-bold w-3 h-3" />
                    </button>
                </div>

            </div>
        </>
    );
};
