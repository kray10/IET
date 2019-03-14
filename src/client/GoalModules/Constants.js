module.exports = {
    taskTypes: [
        'yesNo',
        'textBox',
        'increment',
        'timer',
        'dropdown'
    ],

    taskValues: {
        yesNo: Boolean,
        textBox: String,
        increment: Number,
        timer: null,
        dropdown: String,
        default: undefined
    }
}