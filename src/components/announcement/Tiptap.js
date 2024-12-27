'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import Underline from "@tiptap/extension-underline";
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { useState } from 'react';
import OrderedList from '@tiptap/extension-ordered-list'

const Tiptap = ({}) => {
  const [content,setContent ] = useState(''); 
  const handleChange = (newContent) => {
    console.log("chnage")
    console.log(newContent)
    setContent(newContent);
    

  };
  const CustomOrderedList = OrderedList.extend({
    renderHTML({ HTMLAttributes }) {
      return ['ol', { 
        ...HTMLAttributes, 
        class: '!list-decimal  !ml-4 !my-4' 
      }, 0]
    }
  })

  const editor = useEditor({
    extensions: [Underline,Image.configure({
      inline: true,
      HTMLAttributes:{
        class : 'object-contain max-w-11/12 m-auto',
      }
    }),
      TextAlign.configure({
      types: [ 'paragraph'],
    }),
    StarterKit.configure({
      heading:{
        HTMLAttributes:{
          class:"text-2xl font-bold"
        }
      },
      orderedList:false,
      bulletList:{
        HTMLAttributes:{
          class:"!list-disc  !ml-4 !my-4"
        }
      },
      blockquote:{
        HTMLAttributes:{
          class:'ms-4 border-s border-2'
        }
      }
     
    }),
    CustomOrderedList
    ],
    editorProps:{
      attributes:{
        class:"ronded border min-h-62  p-2  h-72 overflow-scroll border-black"
      }
    },

    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediateRender: false,
    
  })
  if (!editor) {
    return null
  }
  return <div className="w-full">
    <Toolbar  editor={editor} content={content} />
    <EditorContent  style={{ whiteSpace: "pre-line" }}   editor={editor} />
  </div>
}

export default Tiptap
