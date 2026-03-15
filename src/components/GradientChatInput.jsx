import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";

const hexToRgba = (color, alpha) => {
  if (color.startsWith('rgb(')) {
    const rgbValues = color.slice(4, -1).split(',').map(val => parseInt(val.trim()));
    return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
  }
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
};

const mainGradient = {
  topLeft: "#F5E9AD",
  topRight: "#F6B4AD",
  bottomRight: "#F5ABA0",
  bottomLeft: "#F5DCBA",
};

const outerGradient = {
  topLeft: "#E5D99D",
  topRight: "#E6A49D",
  bottomRight: "#E59B90",
  bottomLeft: "#E5CCBA",
};

export default function GradientChatInput({ placeholder = "Ask me anything...", onSend, disabled = false }) {
  const [message, setMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message.trim() && onSend && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      className="relative"
      initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
    >
      <div className="relative">
        {/* Outer thin border */}
        <div
          className="absolute inset-0 rounded-[20px] p-[0.5px]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%,
              ${outerGradient.topLeft} 0deg,
              ${outerGradient.topRight} 90deg,
              ${outerGradient.bottomRight} 180deg,
              ${outerGradient.bottomLeft} 270deg,
              ${outerGradient.topLeft} 360deg)`
          }}
        >
          {/* Main thick border */}
          <div
            className="h-full w-full rounded-[19.5px] p-[2px]"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%,
                ${mainGradient.topLeft} 0deg,
                ${mainGradient.topRight} 90deg,
                ${mainGradient.bottomRight} 180deg,
                ${mainGradient.bottomLeft} 270deg,
                ${mainGradient.topLeft} 360deg)`
            }}
          >
            {/* Inner container */}
            <div
              className="h-full w-full rounded-[17.5px] relative"
              style={{ background: 'var(--card-bg)' }}
            >
              {/* Inner thin border */}
              <div
                className="absolute inset-0 rounded-[17.5px] p-[0.5px]"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%,
                    ${hexToRgba(outerGradient.topLeft, 0.1)} 0deg,
                    ${hexToRgba(outerGradient.topRight, 0.1)} 90deg,
                    ${hexToRgba(outerGradient.bottomRight, 0.1)} 180deg,
                    ${hexToRgba(outerGradient.bottomLeft, 0.1)} 270deg,
                    ${hexToRgba(outerGradient.topLeft, 0.1)} 360deg)`
                }}
              >
                <div className="h-full w-full rounded-[17px]" style={{ background: 'var(--card-bg)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4 flex items-start gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none border-0 bg-transparent text-sm leading-6 py-2 px-0 focus:outline-none overflow-hidden"
            style={{
              minHeight: "40px",
              maxHeight: "120px",
              height: "auto",
              color: 'var(--text-primary)',
              outline: "none",
              boxShadow: "none",
              opacity: disabled ? 0.5 : 1,
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />

          <motion.button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            className="flex items-center justify-center w-8 h-8 mt-1 transition-colors"
            style={{
              color: 'var(--text-secondary)',
              opacity: disabled || !message.trim() ? 0.4 : 1,
              cursor: disabled || !message.trim() ? 'not-allowed' : 'pointer',
            }}
            whileHover={shouldAnimate && message.trim() ? { scale: 1.1 } : {}}
            whileTap={shouldAnimate && message.trim() ? { scale: 0.9 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Shadows */}
        <div
          className="absolute -bottom-3 left-3 right-3 h-6 rounded-full blur-md"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
        />
      </div>
    </motion.div>
  );
}
