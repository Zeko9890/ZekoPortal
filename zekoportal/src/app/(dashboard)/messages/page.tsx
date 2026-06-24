"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  CheckCheck,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  Info,
  Circle
} from "lucide-react";
import { mockConversations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConvId, setActiveConvId] = useState("conv-1");
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const [showThreadOnMobile, setShowThreadOnMobile] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Auto scroll to bottom when active conversation changes or new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvId, activeConversation.messages.length]);

  // Clean unread count on select
  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
    setShowThreadOnMobile(true);
    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c)
    );
  };

  const filteredConversations = conversations.filter(c => 
    c.participant.name.toLowerCase().includes(searchText.toLowerCase()) ||
    c.participant.role.toLowerCase().includes(searchText.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: `msg-custom-${Date.now()}`,
      sender: "client" as const,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setConversations(prev => 
      prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: inputText,
            lastMessageTime: newMessage.timestamp,
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    setInputText("");

    // Simulate an agency reply/auto-response after 1.5 seconds to feel live
    setTimeout(() => {
      const autoResponse = {
        id: `msg-reply-${Date.now()}`,
        sender: "provider" as const,
        text: `Got your message! Our team is reviewing this. We'll update the project board directly if code modifications are needed.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };

      setConversations(prev => 
        prev.map(c => {
          if (c.id === activeConvId) {
            return {
              ...c,
              lastMessage: autoResponse.text,
              lastMessageTime: autoResponse.timestamp,
              messages: [...c.messages, autoResponse]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] border border-border/80 bg-card rounded-xl overflow-hidden shadow-2xl relative">
      
      {/* Left Column: Conversations sidebar */}
      <div className={cn(
        "w-full md:w-80 border-r border-border/80 flex flex-col bg-zinc-950/40 shrink-0 transition-all duration-300 md:flex",
        showThreadOnMobile ? "hidden" : "flex"
      )}>
        
        {/* Search Header */}
        <div className="p-4 border-b border-border/60 space-y-3.5 bg-card">
          <h3 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" /> 
            Inbox Workspace
          </h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/70 bg-white/4 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/45 transition-all"
            />
          </div>
        </div>

        {/* Scrollable Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-zinc-950/20">
          {filteredConversations.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground/60" />
              <span>No conversations found.</span>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;

              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border border-transparent mb-1 card-hover",
                    isActive 
                      ? "bg-white/5 border-border/80 text-white shadow-sm" 
                      : "text-muted-foreground hover:bg-white/3 hover:text-white"
                  )}
                >
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={conv.participant.avatar} 
                      alt={conv.participant.name} 
                      className="h-9 w-9 rounded-full object-cover border border-border/80"
                    />
                    {conv.participant.status === "online" && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-[hsl(240_10%_5%)]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-white truncate leading-tight">
                        {conv.participant.name}
                      </h4>
                      <span className="text-[9px] text-muted-foreground font-semibold shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[10px] text-muted-foreground font-semibold truncate leading-relaxed">
                      {conv.participant.role}
                    </p>

                    <p className={cn(
                      "text-[11px] truncate mt-0.5",
                      conv.unreadCount > 0 ? "font-bold text-white" : "text-muted-foreground"
                    )}>
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="h-4.5 w-4.5 rounded-full bg-primary text-[9px] font-bold text-white flex items-center justify-center shrink-0 ml-1.5 shadow-sm shadow-primary/20">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Chat board thread UI */}
      <div className={cn(
        "flex-1 flex flex-col bg-zinc-950/20 md:flex",
        showThreadOnMobile ? "flex" : "hidden"
      )}>
        
        {/* Chat Thread Header */}
        <div className="h-16 border-b border-border/60 px-4 md:px-6 flex items-center justify-between bg-card shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile back button */}
            <button
              onClick={() => setShowThreadOnMobile(false)}
              className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/6 cursor-pointer"
              aria-label="Back to conversations"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={activeConversation.participant.avatar} 
                alt={activeConversation.participant.name} 
                className="h-9 w-9 rounded-full object-cover border border-border/80"
              />
              {activeConversation.participant.status === "online" && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-[hsl(240_10%_5%)]" />
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-white leading-tight">
                {activeConversation.participant.name}
              </h3>
              <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                <span>{activeConversation.participant.role}</span>
                <span>&bull;</span>
                <span className="text-primary">Zeko Team Partner</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer rounded-lg">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer rounded-lg">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer rounded-lg">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Message Box */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <div className="flex flex-col items-center justify-center py-5 text-center text-[10px] text-zinc-500 border-b border-border/40 mb-6 max-w-xs mx-auto">
            <Sparkles className="h-4 w-4 text-primary/95 mb-1.5 animate-pulse" />
            <p className="font-bold text-white tracking-wide">Workspace Workspace Session</p>
            <p className="mt-0.5 leading-relaxed text-muted-foreground">This session is private & encrypted to authorized Zeko Portal stakeholders.</p>
          </div>

          {activeConversation.messages.map((msg) => {
            const isClient = msg.sender === "client";

            return (
              <div 
                key={msg.id}
                className={cn(
                  "flex w-full flex-col max-w-[80%] sm:max-w-[70%]",
                  isClient ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2.5 rounded-xl text-xs leading-relaxed transition-all shadow-md",
                  isClient 
                    ? "bubble-client text-white rounded-tr-none" 
                    : "bubble-provider text-zinc-100 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                
                <div className="flex items-center gap-1.5 mt-1 px-1 text-[9px] text-muted-foreground font-semibold">
                  <span>{msg.timestamp}</span>
                  {isClient && (
                    <span className="flex items-center gap-0.5">
                      &bull; <CheckCheck className="h-3 w-3 text-primary inline" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Text Area Form Sender */}
        <form 
          onSubmit={handleSendMessage}
          className="p-3 md:p-4 border-t border-border/60 bg-card flex items-center gap-2 shrink-0"
        >
          <Button 
            type="button" 
            variant="ghost" 
            className="h-9 w-9 p-0 text-muted-foreground hover:text-white cursor-pointer rounded-lg hover:bg-white/5"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <input
            type="text"
            placeholder={`Message ${activeConversation.participant.name.split(" ")[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 h-9 px-3 rounded-lg border border-border/70 bg-white/4 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/45 transition-all"
          />

          <Button 
            type="button" 
            variant="ghost" 
            className="h-9 w-9 p-0 text-muted-foreground hover:text-white cursor-pointer rounded-lg hover:bg-white/5 hidden sm:flex justify-center items-center"
          >
            <Smile className="h-4 w-4" />
          </Button>

          <Button 
            type="submit"
            disabled={!inputText.trim()}
            className="h-9 px-4 font-bold gap-1.5 cursor-pointer text-xs shadow-md shadow-primary/10"
          >
            <span>Send</span>
            <Send className="h-3 w-3" />
          </Button>
        </form>

      </div>
    </div>
  );
}
