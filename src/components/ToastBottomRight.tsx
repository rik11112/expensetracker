export default function ToastBottomRight({ text, color }: { text: string, color: string }) {
    return (<div id="toast-bottom-right" className={"fixed flex items-center w-full max-w-xs p-4 space-x-4 divide-x divide-gray-200 rounded-lg shadow right-5 bottom-5 space-x opacity-70 " + color} role="alert">
        <div className="text-xl font-normal">{text}</div>
    </div>);
}
