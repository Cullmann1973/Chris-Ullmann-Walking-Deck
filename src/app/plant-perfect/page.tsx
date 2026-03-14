"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Bot, User, Send, TrendingUp, Calendar, Search, Target } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  scenario?: string;
}

interface TourStop {
  id: string;
  target: string;
  title: string;
  description: string;
}

const tourStops: TourStop[] = [
  {
    id: "1",
    target: "[data-tour='hero']",
    title: "AI Strategic Planning Assistant",
    description: "Plant Perfect analyzes performance data and provides strategic insights for manufacturing optimization"
  },
  {
    id: "2", 
    target: "[data-tour='scenarios']",
    title: "Four Core Capabilities",
    description: "Retrospective analysis, strategic planning, schedule optimization, and golden standard benchmarking"
  },
  {
    id: "3",
    target: "[data-tour='chat']", 
    title: "Intelligent Conversations",
    description: "Ask strategic questions and get data-driven insights with citations from your plant's performance history"
  },
  {
    id: "4",
    target: "[data-tour='examples']",
    title: "Example Questions",
    description: "Start with these common strategic planning questions or ask anything about plant performance"
  },
  {
    id: "5",
    target: "[data-tour='context']",
    title: "Plant Context Aware", 
    description: "All insights are tailored to Beacon Hill facility's specific equipment, processes, and performance patterns"
  }
];

const scenarios = [
  {
    id: "retrospective",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Retrospective Analysis", 
    description: "Review past performance for operational reviews and lessons learned",
    color: "bg-cyan-500/10 border-cyan-500/30"
  },
  {
    id: "strategic", 
    icon: <Target className="w-5 h-5" />,
    title: "Strategic Planning",
    description: "Integrate plant data into next fiscal year initiatives and capital planning",
    color: "bg-emerald-500/10 border-emerald-500/30"
  },
  {
    id: "schedule",
    icon: <Calendar className="w-5 h-5" />,
    title: "Schedule Optimization", 
    description: "Look-ahead analysis for next week's production schedule and resource allocation",
    color: "bg-violet-500/10 border-violet-500/30"
  },
  {
    id: "golden",
    icon: <Search className="w-5 h-5" />,
    title: "Golden Standard Analysis",
    description: "Compare best vs worst performers and identify improvement opportunities", 
    color: "bg-amber-500/10 border-amber-500/30"
  }
];

const exampleQuestions = [
  "What were our top 3 downtime events last quarter and how can we prevent them?",
  "How should next year's automation investment be prioritized based on performance data?", 
  "Which production lines should we schedule for high-complexity jobs next week?",
  "What separates our best OEE days from our worst, and how do we replicate the best?"
];

const sampleResponses: Record<string, Message[]> = {
  retrospective: [
    {
      id: "1",
      text: "What were our top 3 downtime events last quarter and how can we prevent them?",
      sender: "user",
      timestamp: new Date(),
      scenario: "retrospective"
    },
    {
      id: "2", 
      text: "Based on Q3 performance data, the top 3 downtime events were:\n\n**1. Filler Line 3 - Sensor Calibration Issues (47 hours total)**\n- Root cause: Inadequate preventive maintenance schedule\n- Prevention: Implement weekly sensor calibration protocol\n\n**2. Packaging Line 1 - Label Web Breaks (31 hours total)** \n- Root cause: Humidity control during changeovers\n- Prevention: Climate conditioning 30min before changeover\n\n**3. Mixing Tank B - Temperature Control Failures (28 hours total)**\n- Root cause: Steam valve actuator wear\n- Prevention: Replace actuators on 18-month cycle vs current 24-month\n\n*Sources: Maximo work orders Q3, OEE logs, maintenance reports*",
      sender: "ai", 
      timestamp: new Date(),
      scenario: "retrospective"
    }
  ],
  strategic: [
    {
      id: "1",
      text: "How should next year's automation investment be prioritized based on performance data?",
      sender: "user", 
      timestamp: new Date(),
      scenario: "strategic"
    },
    {
      id: "2",
      text: "FY26 automation investment priority ranking:\n\n**Priority 1: Packaging Line 1 Auto-Reject System ($280K)**\n- ROI: 18 months based on quality cost reduction\n- Impact: Eliminate 3.2% manual quality holds\n\n**Priority 2: Filler Line 2 Vision Inspection ($195K)**\n- ROI: 24 months based on reduced customer complaints\n- Impact: Catch fill-level variations before shipping\n\n**Priority 3: Material Handling Conveyor Upgrade ($150K)**\n- ROI: 36 months based on labor reduction\n- Impact: Enable lights-out operation during night shift\n\n*Analysis includes payback calculations, risk assessment, and strategic alignment with Plant Excellence initiative.*",
      sender: "ai",
      timestamp: new Date(), 
      scenario: "strategic"
    }
  ]
};

export default function PlantPerfectPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  
  // Tour state
  const [currentTourStop, setCurrentTourStop] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [tourIntervalId, setTourIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Tour bubble positioning
  const [tourPosition, setTourPosition] = useState({ x: 0, y: 0 });

  const updateTourPosition = useCallback(() => {
    if (!showTour) return;
    
    const currentStop = tourStops[currentTourStop];
    const targetElement = document.querySelector(currentStop.target);
    
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTourPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [currentTourStop, showTour]);

  useEffect(() => {
    if (!showTour) return;

    updateTourPosition();
    window.addEventListener('scroll', updateTourPosition);
    window.addEventListener('resize', updateTourPosition);

    const intervalId = setInterval(() => {
      setCurrentTourStop(prev => (prev + 1) % tourStops.length);
    }, 4000);
    setTourIntervalId(intervalId);

    return () => {
      window.removeEventListener('scroll', updateTourPosition);
      window.removeEventListener('resize', updateTourPosition);
      if (intervalId) clearInterval(intervalId);
    };
  }, [showTour, updateTourPosition]);

  useEffect(() => {
    updateTourPosition();
  }, [currentTourStop, updateTourPosition]);

  const handleScenarioClick = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    if (sampleResponses[scenarioId]) {
      setMessages(sampleResponses[scenarioId]);
    }
  };

  const handleExampleClick = (question: string) => {
    setInputText(question);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your plant's performance data to provide strategic insights. This is a demo response that would contain data-driven recommendations based on your specific manufacturing metrics, historical trends, and operational context.",
        sender: "ai", 
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const currentStop = tourStops[currentTourStop];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/#ai-section"
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">Back to Blueprint</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div data-tour="hero" className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Beacon Hill Manufacturing • Boston, MA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            Plant Perfect
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-2">
            AI Strategic Planning Assistant
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get data-driven insights for operational reviews, fiscal year planning, production optimization, 
            and performance benchmarking. Ask strategic questions, get intelligent answers.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div data-tour="scenarios" className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Strategic Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioClick(scenario.id)}
                className={`${scenario.color} border rounded-xl p-6 text-left hover:border-cyan-400 transition-all duration-200 hover:scale-105 group`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {scenario.icon}
                  </div>
                  <h3 className="font-semibold text-white">{scenario.title}</h3>
                </div>
                <p className="text-sm text-slate-300">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div data-tour="chat" className="bg-slate-800/50 rounded-xl border border-slate-700/50 mb-8">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-semibold">Strategic Planning Assistant</h3>
              {activeScenario && (
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full">
                  {scenarios.find(s => s.id === activeScenario)?.title}
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                <p>Choose a scenario above or ask a strategic planning question</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-4 ${
                      message.sender === 'user' 
                        ? 'bg-cyan-500/20 text-cyan-100 rounded-tr-none' 
                        : 'bg-slate-700/50 text-slate-100 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-2xl">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-700/50 rounded-lg rounded-tl-none p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-700/50">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about plant performance, strategic planning, or operational improvements..."
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Example Questions */}
        <div data-tour="examples" className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Example Strategic Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(question)}
                className="text-left p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-cyan-400/50 rounded-lg transition-all duration-200 group"
              >
                <p className="text-sm text-slate-300 group-hover:text-white">{question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Plant Context */}
        <div data-tour="context" className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Plant Context: Beacon Hill Facility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-slate-400 mb-1">Production Lines</div>
              <div className="text-white">3 Filling • 2 Packaging • 1 Compounding</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Key Products</div>
              <div className="text-white">Premium Skincare • Color Cosmetics</div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Operational Focus</div>
              <div className="text-white">Quality • Efficiency • Innovation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Bubble */}
      {showTour && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-300"
          style={{
            left: tourPosition.x,
            top: tourPosition.y,
            transform: 'translate(-50%, -120%)'
          }}
        >
          <div className="relative">
            <div className="bg-amber-500 text-amber-900 px-4 py-3 rounded-lg shadow-xl max-w-xs border-2 border-amber-400">
              <div className="font-semibold text-sm mb-1">{currentStop.title}</div>
              <div className="text-xs leading-relaxed">{currentStop.description}</div>
              
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-amber-400"></div>
                <div className="w-0 h-0 border-l-3 border-r-3 border-t-5 border-transparent border-t-amber-500 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={() => setShowTour(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 hover:bg-amber-700 text-amber-100 rounded-full text-xs flex items-center justify-center transition-colors pointer-events-auto"
            >
              ×
            </button>

            {/* Tour progress */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
              {tourStops.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentTourStop ? 'bg-amber-400' : 'bg-amber-600/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tour restart button (when dismissed) */}
      {!showTour && (
        <button
          onClick={() => {
            setShowTour(true);
            setCurrentTourStop(0);
          }}
          className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-amber-900 px-4 py-2 rounded-lg shadow-lg transition-colors text-sm font-medium"
        >
          Restart Tour
        </button>
      )}
    </div>
  );
}