<template>
  <div>
    <Navbar />
    
    <div class="auth-page">
      <div class="container">
        <div class="auth-card card">
          <h2>로그인</h2>
          <p class="subtitle">다시 만나서 반가워요!</p>

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

    // 토큰과 사용자 정보 저장
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
/* signup.vue와 동일한 스타일 사용 */
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 40px 0;
}

.auth-card {
  max-width: 450px;
  margin: 0 auto;
}

.auth-card h2 {
  font-size: 32px;
  margin-bottom: 8px;
  color: #1F2937;
}

.subtitle {
  color: #6B7280;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.error-message {
  background: #FEE2E2;
  color: #DC2626;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.switch-auth {
  text-align: center;
  margin-top: 20px;
  color: #6B7280;
}

.switch-auth a {
  color: #4F46E5;
  text-decoration: none;
  font-weight: 600;
}

.switch-auth a:hover {
  text-decoration: underline;
}
</style>