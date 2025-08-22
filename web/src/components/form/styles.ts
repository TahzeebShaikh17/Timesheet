export const formStyles = {
    // Base styles for all form elements
    base: {
        height: 'h-12', // 48px height
        borderRadius: 'rounded-xl',
        border: 'border-2 border-gray-200',
        shadow: 'shadow-sm',
        focusRing: 'focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
        errorBorder: 'border-red-400 focus:border-red-500',
    },

    // Input specific styles
    input: {
        base: 'block w-full bg-white',
        type: 'text-base leading-5 text-gray-900 placeholder-gray-400',
        padding: 'px-4 py-3',
        focus: 'focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300',
        error: 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
        disabled: 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    },

    // Select specific styles
    select: {
        base: 'block w-full bg-white cursor-pointer',
        type: 'text-base leading-5 text-gray-900',
        padding: 'pl-4 pr-10 py-3', // Extra padding for dropdown arrow
        focus: 'focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300',
        error: 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
        disabled: 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    },

    // Button specific styles
    button: {
        base: 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        type: 'text-base',
        padding: 'px-6 py-3', // Same height as inputs/selects
        focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variants: {
            primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
            secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-gray-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
            danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
            outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500 bg-white shadow-sm hover:shadow-md',
            success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
        },
        sizes: {
            sm: 'px-4 py-2 text-sm rounded-lg',
            md: 'px-6 py-3 text-base rounded-xl',
            lg: 'px-8 py-4 text-lg rounded-xl',
        }
    },

    // Label styles
    label: {
        base: 'block text-sm font-semibold text-gray-700 mb-2',
        required: 'after:content-["*"] after:ml-1 after:text-red-500',
    },

    // Error message styles
    error: {
        message: 'text-sm text-red-600 mt-2 flex items-center',
        icon: 'w-4 h-4 mr-1 flex-shrink-0',
    },

    // Success message styles
    success: {
        message: 'text-sm text-green-600 mt-2 flex items-center',
        icon: 'w-4 h-4 mr-1 flex-shrink-0',
    },

    // Helper text styles
    helper: {
        message: 'text-sm text-gray-500 mt-1',
    },
};