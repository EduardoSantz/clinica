function login(email, password) {
    if (email === 'teste@example.com' && password === 'password') {
        localStorage.setItem('user_token', 'valid-token-123');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user_token');
    window.location.href = '/auth/login.html';
}

function checkAuth() {
    // Se não houver token e não estiver na página de login, redireciona
    if (!localStorage.getItem('user_token') && !window.location.pathname.endsWith('login.html')) {
        window.location.href = '/auth/login.html';
    }
}

// Verifica a autenticação em todas as páginas
checkAuth();