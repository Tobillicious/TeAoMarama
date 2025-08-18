// Authentication Diagnostics functionality

async function runDiagnostics() {
    const results = document.getElementById('diagnosticResults');
    let html = '<h2>🔍 Diagnostic Results</h2>';

    // Check environment configuration
    html += '<div class="status-card status-success">';
    html += '<h3>✅ Environment Configuration</h3>';
    html += `<p>Supabase URL: ${window.ENV.SUPABASE_URL}</p>`;
    html += `<p>Environment: ${window.ENV.NODE_ENV}</p>`;
    html += '</div>';

    // Check API key format
    const apiKey = window.ENV.SUPABASE_ANON_KEY;
    if (apiKey && apiKey !== 'ENVIRONMENT_VARIABLE_REQUIRED') {
        try {
            // Decode JWT payload
            const payload = JSON.parse(atob(apiKey.split('.')[1]));
            const projectRef = payload.ref;
            
            if (projectRef === 'nlgldaqtubrlcqddppbq') {
                html += '<div class="status-card status-success">';
                html += '<h3>✅ API Key Project Match</h3>';
                html += `<p>API key is for correct project: ${projectRef}</p>`;
                html += '</div>';
            } else {
                html += '<div class="status-card status-error">';
                html += '<h3>❌ API Key Project Mismatch</h3>';
                html += `<p>API key is for project: <strong>${projectRef}</strong></p>`;
                html += `<p>But trying to connect to: <strong>nlgldaqtubrlcqddppbq</strong></p>`;
                html += '<p><strong>This is why authentication fails!</strong></p>';
                html += '</div>';
            }
        } catch (e) {
            html += '<div class="status-card status-error">';
            html += '<h3>❌ Invalid API Key Format</h3>';
            html += '<p>API key is not a valid JWT token</p>';
            html += '</div>';
        }
    } else {
        html += '<div class="status-card status-error">';
        html += '<h3>❌ Missing API Key</h3>';
        html += '<p>No API key configured</p>';
        html += '</div>';
    }

    // Test Supabase connection
    try {
        const { data, error } = await window.supabaseClient.auth.getSession();
        if (error) {
            html += '<div class="status-card status-error">';
            html += '<h3>❌ Supabase Connection Failed</h3>';
            html += `<p>Error: ${error.message}</p>`;
            html += '</div>';
        } else {
            html += '<div class="status-card status-success">';
            html += '<h3>✅ Supabase Connection Working</h3>';
            html += '<p>Successfully connected to Supabase</p>';
            html += '</div>';
        }
    } catch (error) {
        html += '<div class="status-card status-error">';
        html += '<h3>❌ Supabase Client Error</h3>';
        html += `<p>Error: ${error.message}</p>`;
        html += '</div>';
    }

    results.innerHTML = html;
}

// Run diagnostics when page loads
document.addEventListener('DOMContentLoaded', runDiagnostics);