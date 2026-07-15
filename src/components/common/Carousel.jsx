/**
 * Copyright © 2026, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * Hero section redesigned to match the Eden Sign premium reference design.
 * Split layout: text + search bar left, hero image + floating cards right.
 * Integrated with Alibaba page-agent for natural language interface navigation and control.
 */

import React, { useState } from 'react';
import './carousel.css';
import { PageAgent } from 'page-agent';

/* ── Inline SVG icons (no extra deps) ── */
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, color: 'var(--es-emerald)' }}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--es-blush-deep)' }}>
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
  </svg>
);

const Carousel = () => {
  // AI Agent States
  const [aiCommand, setAiCommand] = useState('');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentStatus, setAgentStatus] = useState('');

  // Clean empty strings and migrate old Google URLs from localStorage
  React.useEffect(() => {
    const keysToCheck = [
      'es_ai_agent_provider',
      'es_ai_agent_base_url',
      'es_ai_agent_model',
      'es_ai_agent_api_key'
    ];
    keysToCheck.forEach(key => {
      const val = localStorage.getItem(key);
      if (val !== null && val.trim() === '') {
        localStorage.removeItem(key);
      }
    });

    // Migrate from direct Google URL (which blocks CORS) to the new secure backend proxy
    const oldBase = localStorage.getItem('es_ai_agent_base_url');
    if (oldBase && oldBase.includes('generativelanguage.googleapis.com')) {
      localStorage.removeItem('es_ai_agent_base_url');
    }
  }, []);



  // Traditional search logic removed

  const handleAISubmit = async (e) => {
    e.preventDefault();
    console.log("✦ AI Submit Triggered. Command:", aiCommand);
    if (!aiCommand.trim()) {
      console.log("✦ Command is empty, ignoring.");
      return;
    }

    const storedKey = localStorage.getItem('es_ai_agent_api_key');
    const apiKey = (storedKey && storedKey.trim() !== '') ? storedKey : (import.meta.env.VITE_PAGE_AGENT_API_KEY || '');

    const storedBase = localStorage.getItem('es_ai_agent_base_url');
    const baseURL = (storedBase && storedBase.trim() !== '') ? storedBase : (import.meta.env.VITE_PAGE_AGENT_BASE_URL || 'http://localhost:8080/api/v1/ai-agent');

    const storedMod = localStorage.getItem('es_ai_agent_model');
    const model = (storedMod && storedMod.trim() !== '') ? storedMod : (import.meta.env.VITE_PAGE_AGENT_MODEL || 'gemini-1.5-flash');

    console.log("✦ AI Agent Configuration (Gemini Dedicated):", {
      provider: 'gemini',
      model: model,
      baseURL: baseURL,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0
    });

    setIsAgentRunning(true);
    setAgentStatus('Initializing AI Page Agent...');

    try {
      console.log("✦ Creating PageAgent instance...");
      const agent = new PageAgent({
        model: model,
        baseURL: baseURL,
        apiKey: apiKey,
        language: 'en-US',
        instructions: {
          system: `You are an AI assistant helping users navigate the Eden Sign beauty portal.
Guidelines:
1. If the user asks to show or find a list of products (e.g., "show me products under 200", "find beauty products"), you MUST navigate to the main PRODUCTS listing page (/products) to show the list of products. Do NOT click into a single product's detail page.
2. If the user asks to show, find, or search salons in a city or for a service (e.g., "bareilly salon for hair", "find salons in Mumbai"), you MUST navigate to the main SALONS directory page (/salons) to show the listing of salons. Do NOT click into a single salon's detail page.
3. Only click into a single product or salon detail page if the user explicitly asks to "view details", "see details", "book", or specifies a single item by name to inspect it (e.g., "view Jawed Habib details", "book slot at Maison de Beauté").
4. IMPORTANT: Do NOT ask the user any questions and do NOT call the 'ask_user' tool. If there are multiple search results or ambiguous options, pick the first option or keep the list visible and conclude the task immediately as successful.`
        }
      });

      // Override UI panel to prevent it from ever showing or expanding (forces headless execution)
      if (agent.panel) {
        if (agent.panel.wrapper) {
          agent.panel.wrapper.style.display = 'none';
          agent.panel.wrapper.style.visibility = 'hidden';
          agent.panel.wrapper.style.opacity = '0';
        }
        agent.panel.show = function() {
          if (this.wrapper) {
            this.wrapper.style.display = 'none';
            this.wrapper.style.opacity = '0';
          }
        };
        agent.panel.expand = () => {};
      }

      console.log("✦ PageAgent instance created. Calling agent.execute()...");
      setAgentStatus(`Executing command: "${aiCommand}"`);
      await agent.execute(aiCommand);
      console.log("✦ PageAgent execution finished successfully.");
      setAgentStatus('Command executed successfully!');

      // Automatically clean up the page-agent UI overlay after a 3-second delay
      setTimeout(() => {
        try {
          agent.dispose();
          console.log("✦ PageAgent instance disposed and UI overlay removed.");
        } catch (disposeErr) {
          console.warn("✦ PageAgent dispose warning:", disposeErr);
        }
      }, 3000);
    } catch (err) {
      console.error("✦ AI Page Agent execution error:", err);
      setAgentStatus(`Execution error: ${err.message || 'Check browser console'}`);
    } finally {
      setTimeout(() => {
        setIsAgentRunning(false);
        setAgentStatus('');
      }, 5000);
    }
  };


  return (
    <section className="es-hero-new">
      {/* Decorative blobs */}
      <div className="es-hero-blob es-hero-blob-1" />
      <div className="es-hero-blob es-hero-blob-2" />

      <div className="es-hero-container">
        <div className="es-hero-grid">

          {/* ── Left: Text + Search ── */}
          <div className="es-hero-text-col">

            <span className="es-hero-badge">
              <span className="es-hero-badge-dot es-pulse-dot" />
              The Salon Ecosystem
            </span>

            <h1 className="es-hero-h1">
              The sanctuary for{' '}
              <em className="es-hero-h1-accent">exceptional</em> beauty.
            </h1>

            <p className="es-hero-subtext">
              Discover elite salons, book master stylists, source professional formulas, learn from
              global academies, and belong to a world designed around the craft of beauty.
            </p>

            {/* Search bar (AI Agent Dedicated) */}
            <form className="es-hero-search es-hero-search-ai-active" onSubmit={handleAISubmit}>
              <div className="es-hero-search-ai-input-wrapper">
                <span className="es-hero-ai-glow-dot">✦</span>
                <input
                  type="text"
                  placeholder="Ask AI (e.g. 'go to academy page', 'go to about page', 'click sign in')..."
                  value={aiCommand}
                  onChange={(e) => setAiCommand(e.target.value)}
                  className="es-hero-search-input-ai"
                  id="hero-ai-command"
                  disabled={isAgentRunning}
                  autoFocus
                />
              </div>
              <div className="es-hero-search-ai-controls">
                <button
                  type="submit"
                  className="es-hero-search-btn es-hero-ai-run"
                  disabled={isAgentRunning || !aiCommand.trim()}
                >
                  {isAgentRunning ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* Feature tags */}
            <div className="es-hero-tags">
              <span className="es-hero-tag">
                <SparkleIcon />
                AI Beauty Concierge
              </span>
              <span className="es-hero-tag">
                <span className="es-hero-tag-dot" />
                Verified salons &amp; stylists
              </span>
              <span className="es-hero-tag">
                <span className="es-hero-tag-dot" />
                WhatsApp &amp; Voice reminders
              </span>
            </div>
          </div>

          {/* ── Right: Images + Floating Cards ── */}
          <div className="es-hero-img-col">

            {/* Main hero image */}
            <div className="es-hero-img-main">
              <img
                src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/header/photo1.jpg"
                alt="A luxury Eden Sign salon interior with warm ambient light"
                className="es-hero-img-main-img"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Small floating image bottom-left */}
            <div className="es-hero-img-float es-animate-float">
              <img
                src="https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/header/photo2.jpg"
                alt="Premium beauty product from the Eden Sign marketplace"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Live booking card top-right */}
            <div className="es-hero-booking-card es-animate-float-card">
              <div className="es-hero-card-header">
                <span className="es-hero-card-dot es-pulse-dot" />
                <span className="es-hero-card-label">Live booking</span>
              </div>
              <p className="es-hero-card-salon">Maison de Beauté</p>
              <p className="es-hero-card-info">Bandra · 4 slots today</p>
              <a href="/salons" className="es-hero-card-btn">Reserve</a>
            </div>

            {/* AI chip bottom-right */}
            <div className="es-hero-ai-chip">
              <span className="es-hero-ai-icon">✦</span>
              <span className="es-hero-ai-text">AI ASSISTANT</span>
              <span className="es-hero-ai-sub">Analyze my routine</span>
            </div>
          </div>

        </div>
      </div>

      {/* AI Agent Status Overlay */}
      {isAgentRunning && (
        <div className="es-ai-agent-status-overlay">
          <div className="es-ai-agent-status-card">
            <div className="es-ai-agent-spinner">✦</div>
            <div className="es-ai-agent-status-text">
              <div className="es-ai-agent-status-title">AI Page Agent Active</div>
              <div className="es-ai-agent-status-desc">{agentStatus}</div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal removed */}
    </section>
  );
};

export default React.memo(Carousel);
