/**
 * Copyright © 2026, Eden Sign Inc. ALL RIGHTS RESERVED.
 * 
 * Beautiful configuration modal/drawer for AI Page Agent settings.
 * Includes presets for Google Gemini, OpenAI, and DeepSeek, with local storage persistence.
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const PRESETS = {
  gemini: {
    name: 'Google Gemini',
    baseURL: 'http://localhost:8080/api/v1/ai-agent',
    model: 'gemini-1.5-flash',
    info: 'Gemini is proxied securely through the backend. Leave API Key blank to use server default, or enter a custom key.'
  },

  openai: {
    name: 'OpenAI',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    info: 'Enter your OpenAI API key from OpenAI Platform.'
  },
  deepseek: {
    name: 'DeepSeek',
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    info: 'Enter your DeepSeek API key from DeepSeek Developer Platform.'
  },
  custom: {
    name: 'Custom',
    baseURL: '',
    model: '',
    info: 'Provide a custom OpenAI-compatible endpoint URL.'
  }
};

const AIAgentSettings = ({ open, onClose, onSave }) => {
  const [provider, setProvider] = useState('gemini');
  const [baseURL, setBaseURL] = useState(PRESETS.gemini.baseURL);
  const [model, setModel] = useState(PRESETS.gemini.model);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const storedProv = localStorage.getItem('es_ai_agent_provider');
    const savedProvider = (storedProv && storedProv.trim() !== '') ? storedProv : (import.meta.env.VITE_PAGE_AGENT_PROVIDER || 'gemini');

    const storedBase = localStorage.getItem('es_ai_agent_base_url');
    const savedBaseURL = (storedBase && storedBase.trim() !== '') ? storedBase : (import.meta.env.VITE_PAGE_AGENT_BASE_URL || PRESETS.gemini.baseURL);

    const storedMod = localStorage.getItem('es_ai_agent_model');
    const savedModel = (storedMod && storedMod.trim() !== '') ? storedMod : (import.meta.env.VITE_PAGE_AGENT_MODEL || PRESETS.gemini.model);

    const storedKey = localStorage.getItem('es_ai_agent_api_key');
    const savedApiKey = (storedKey && storedKey.trim() !== '') ? storedKey : (import.meta.env.VITE_PAGE_AGENT_API_KEY || '');

    setProvider(savedProvider);
    setBaseURL(savedBaseURL);
    setModel(savedModel);
    setApiKey(savedApiKey);
  }, [open]);

  const handleProviderSelect = (key) => {
    setProvider(key);
    setBaseURL(PRESETS[key].baseURL);
    setModel(PRESETS[key].model);
  };

  const handleSave = () => {
    localStorage.setItem('es_ai_agent_provider', provider);
    localStorage.setItem('es_ai_agent_base_url', baseURL);
    localStorage.setItem('es_ai_agent_model', model);
    localStorage.setItem('es_ai_agent_api_key', apiKey);
    
    if (onSave) {
      onSave({ provider, baseURL, model, apiKey });
    }
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '24px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: 'var(--es-emerald)' }} />
          <Typography variant="h5" component="div" sx={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--es-charcoal)' }}>
            AI Agent Settings
          </Typography>
        </Box>
        <IconButton onClick={onClose} aria-label="close" sx={{ color: 'var(--es-charcoal-40)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pb: 1 }}>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
          Configure the AI engine that drives the home page agent. Select a preset provider below or configure custom parameters.
        </Typography>

        {/* Preset Providers */}
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
          Select AI Provider
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {Object.keys(PRESETS).map((key) => {
            const isSelected = provider === key;
            return (
              <Grid item xs={6} sm={3} key={key}>
                <Card 
                  onClick={() => handleProviderSelect(key)}
                  sx={{
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--es-emerald)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '16px',
                    boxShadow: isSelected ? '0 8px 16px rgba(15, 93, 78, 0.12)' : 'none',
                    backgroundColor: isSelected ? 'rgba(15, 93, 78, 0.04)' : '#ffffff',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: 'var(--es-emerald)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: '16px !important', textAlign: 'center' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 650, 
                        fontFamily: 'var(--font-sans)',
                        color: isSelected ? 'var(--es-emerald)' : 'var(--es-charcoal)'
                      }}
                    >
                      {PRESETS[key].name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Inputs */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="API Key"
            type={showKey ? 'text' : 'password'}
            fullWidth
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="paste your API key here..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowKey(!showKey)} edge="end">
                    {showKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: '12px' }
            }}
            helperText={PRESETS[provider]?.info || 'Provide your LLM API Key.'}
          />

          <TextField
            label="Base URL"
            fullWidth
            value={baseURL}
            onChange={(e) => setBaseURL(e.target.value)}
            disabled={provider !== 'custom'}
            variant="outlined"
            InputProps={{ style: { borderRadius: '12px' } }}
          />

          <TextField
            label="Model Name"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={provider !== 'custom'}
            variant="outlined"
            InputProps={{ style: { borderRadius: '12px' } }}
            helperText="e.g. gemini-1.5-flash, gpt-4o-mini, deepseek-chat"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, display: 'flex', gap: 1.5 }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            borderRadius: '12px', 
            textTransform: 'none', 
            px: 3, 
            fontFamily: 'var(--font-sans)',
            color: 'var(--es-charcoal-60)'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          sx={{ 
            borderRadius: '12px', 
            backgroundColor: 'var(--es-emerald)', 
            '&:hover': { backgroundColor: 'var(--es-emerald-soft)' },
            textTransform: 'none',
            px: 4,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600
          }}
        >
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIAgentSettings;
