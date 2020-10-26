<template>
    <div>
        <ckeditor
            :editor="editor"
            :value="value"
            :config="editorConfig"
            @input="handleInput($event)"
        ></ckeditor>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    props: {
        value: {
            type: String,
            default: "Content of the editor."
        }
    },
    data: () => ({
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'insertTable',
                    '|',
                    '|',
                    'mediaEmbed',
                    'undo',
                    'redo'
                ]
            },
            removePlugins: [],
            placeholder: 'Type the content here!',
        },
    }),
    methods: {
        handleInput(event) {
            this.$emit("input", event)
        }
    }
}
</script>
