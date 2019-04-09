module.exports = {
    taskTypes: [
        'yesNo',
        'textBox',
        'increment',
        'timer',
        'dropdown'
    ],

    taskValues: {
        yesNo: "string",
        textBox: "string",
        increment: "number",
        timer: "object",
        dropdown: "string",
        default: "object"
    },

    defaultValues: {
        yesNo: '',
        textBox: '',
        increment: 0,
        timer: null,
        dropdown: '',
        default: null
    }
}