<template>
  <div class="auth-page">
    <Navbar />
    
    <div class="auth-container">
      <div class="container">
        <div class="auth-card">
          <h2>로그인</h2>
          <p class="subtitle">다시 만나서 반가워요</p>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label>이메일</label>
              <input 
                type="email" 
                v-model="form.email" 
                class="input" 
                placeholder="example@email.com"
                required
              >
            </div>

            <div class="form-group">
              <label>비밀번호</label>
              <input 
                type="password" 
                v-model="form.password" 
                class="input" 
                placeholder="비밀번호"
                required
              >
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              로그인
            </button>
          </form>

          <p class="switch-auth">
            계정이 없으신가요? 
            <NuxtLink to="/signup">회원가입</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const config = useRuntimeConfig()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  error.value = ''

  try {
    const response = await fetch(`${config.public.apiBase}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.error || '로그인에 실패했습니다'
      return
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    alert('로그인 성공!')
    router.push('/dashboard')
  } catch (err) {
    error.value = '서버 연결에 실패했습니다'
  }
}
</script>

<style scoped>
/* signup.vue와 동일한 스타일 */
.auth-page {
  background: #0a0a0a;
  min-height: 100vh;
}

.auth-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 40px 0;
}

.auth-card {
  max-width: 450px;
  margin: 0 auto;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 48px 80px;
}

.auth-card h2 {
  font-size: 32px;
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 600;
}

.subtitle {
  color: #999;
  margin-bottom: 32px;
  font-size: 15px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #e5e5e5;
  font-size: 14px;
}

.error-message {
  background: #2a1a1a;
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #3a2a2a;
  font-size: 14px;
}

.switch-auth {
  text-align: center;
  margin-top: 24px;
  color: #999;
  font-size: 14px;
}

.switch-auth a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
}

.switch-auth a:hover {
  text-decoration: underline;
}
</style>