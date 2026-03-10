/**
 * SDK routes — serves the embeddable Plury SDK script
 * GET /sdk/plury.js — full SDK
 * GET /sdk/plury.min.js — minified (same content for now)
 */
import { Router } from 'express'

const router = Router()

const SDK_SCRIPT = `/**
 * Plury SDK v1.0
 * Embed AI-powered web generation in your platform.
 *
 * Usage:
 *   <script src="https://plury.co/sdk/plury.js"></script>
 *   <script>
 *     const plury = Plury.init({
 *       apiKey: 'pk_live_...',
 *       container: '#builder',     // CSS selector or DOM element
 *       theme: {                   // optional
 *         primaryColor: '#6366f1',
 *         brandName: 'My Agency',
 *         logo: 'https://...'
 *       },
 *       locale: 'es',             // 'es' | 'en'
 *       onComplete: (result) => {
 *         console.log('Generated:', result);
 *       },
 *       onError: (error) => {
 *         console.error('Error:', error);
 *       }
 *     });
 *   </script>
 *
 * API:
 *   plury.generate(prompt, options)  - Start generation
 *   plury.getResult(id)              - Get generation result
 *   plury.destroy()                  - Cleanup
 */
(function(root) {
  'use strict';

  var API_HOST = 'https://plury.co';

  function PluryInstance(config) {
    this.apiKey = config.apiKey;
    this.apiBase = (config.apiBase || API_HOST) + '/api/v1';
    this.embedBase = config.apiBase || API_HOST;
    this.theme = config.theme || {};
    this.locale = config.locale || 'es';
    this.onComplete = config.onComplete || function() {};
    this.onError = config.onError || function() {};
    this.iframe = null;
    this.container = null;

    if (config.container) {
      this._mountEmbed(config.container);
    }
  }

  PluryInstance.prototype._mountEmbed = function(target) {
    var container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) {
      console.error('[Plury] Container not found:', target);
      return;
    }
    this.container = container;

    var iframe = document.createElement('iframe');
    var params = new URLSearchParams();
    params.set('apiKey', this.apiKey);
    params.set('locale', this.locale);
    if (this.theme) params.set('theme', JSON.stringify(this.theme));

    iframe.src = this.embedBase + '/embed?' + params.toString();
    iframe.style.cssText = 'width:100%;height:100%;border:none;min-height:500px;';
    iframe.setAttribute('allow', 'clipboard-write');
    iframe.setAttribute('title', 'Plury Builder');
    container.innerHTML = '';
    container.appendChild(iframe);
    this.iframe = iframe;

    // Listen for completion events from embed
    var self = this;
    window.addEventListener('message', function handler(e) {
      if (!e.data || !e.data.type) return;
      if (e.data.type === 'plury:complete') {
        self.onComplete(e.data.result);
      }
      if (e.data.type === 'plury:error') {
        self.onError(e.data.error);
      }
    });
  };

  PluryInstance.prototype.generate = function(prompt, options) {
    var self = this;
    options = options || {};

    return fetch(this.apiBase + '/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({
        prompt: prompt,
        agent: options.agent || 'dev',
        model: options.model,
        webhook_url: options.webhookUrl
      })
    })
    .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
    .then(function(result) {
      if (!result.ok) throw new Error(result.data.error || 'Generation failed');

      // If embed is mounted, trigger generation in iframe
      if (self.iframe) {
        self.iframe.contentWindow.postMessage({
          type: 'plury:generate',
          prompt: prompt
        }, '*');
      }

      return {
        id: result.data.id,
        status: result.data.status,
        pollUrl: result.data.poll_url
      };
    });
  };

  PluryInstance.prototype.getResult = function(id) {
    return fetch(this.apiBase + '/generations/' + id, {
      headers: { 'X-API-Key': this.apiKey }
    })
    .then(function(res) { return res.json(); });
  };

  PluryInstance.prototype.getUsage = function() {
    return fetch(this.apiBase + '/usage', {
      headers: { 'X-API-Key': this.apiKey }
    })
    .then(function(res) { return res.json(); });
  };

  PluryInstance.prototype.listAgents = function() {
    return fetch(this.apiBase + '/agents')
    .then(function(res) { return res.json(); });
  };

  PluryInstance.prototype.destroy = function() {
    if (this.iframe && this.container) {
      this.container.removeChild(this.iframe);
      this.iframe = null;
    }
  };

  // Main entry point
  var Plury = {
    init: function(config) {
      if (!config || !config.apiKey) {
        throw new Error('[Plury] apiKey is required. Get yours at https://plury.co');
      }
      return new PluryInstance(config);
    },
    version: '1.0.0'
  };

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Plury;
  } else {
    root.Plury = Plury;
  }
})(typeof window !== 'undefined' ? window : this);
`

router.get('/plury.js', (_req, res) => {
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(SDK_SCRIPT)
})

router.get('/plury.min.js', (_req, res) => {
  res.setHeader('Content-Type', 'application/javascript')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(SDK_SCRIPT)
})

export default router
