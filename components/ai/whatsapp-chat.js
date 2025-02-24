import { User, Phone } from 'lucide-react'


export function WhatsAppChat({ messages, onCopy }) {
  return (
    <div className="border rounded-lg overflow-hidden max-w-md w-full mx-auto bg-gray-100">
      <div className="bg-green-600 text-white p-4 flex items-center">
        <User className="w-8 h-8 mr-2" />
        <div>
          <h3 className="font-semibold">WhatsApp Chat</h3>
          <p className="text-sm opacity-75">Template Preview</p>
        </div>
      </div>
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isTemplate ? 'justify-start' : 'justify-end'}`}>
            <div className={`rounded-lg p-3 max-w-[70%] ${message.isTemplate ? 'bg-white' : 'bg-green-500 text-white'}`}>
              <p className={message.isTemplate ? 'blur-sm' : ''}>{message.text}</p>
              {message.isTemplate && (
                <button
                  onClick={() => onCopy(message.text)}
                  className="mt-2 text-xs text-blue-500 hover:underline focus:outline-none"
                >
                  Copy Template
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-200 p-4 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-grow rounded-full px-4 py-2 focus:outline-none"
          disabled
        />
        <Phone className="w-6 h-6 ml-2 text-green-600" />
      </div>
    </div>
  )
}

