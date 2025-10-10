<template>
  <div>
    <Navbar />
    
    <div class="auth-page">
      <div class="container">
        <div class="auth-card card">
          <h2>회원가입</h2>
          <p class="subtitle">OnMark와 함께 시작하세요</p>

          <form @submit.prevent="handleSignup">
            <div class="form-group">
              <label>이름</label>
              <input 
                type="text" 
                v-model="form.username" 
                class="input" 
                placeholder="홍길동"
                required
              >
            </div>

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
                placeholder="8자 이상"
                required
              >
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              회원가입
            </button>
          </form>

          <p class="switch-auth">
            이미 계정이 있으신가요? 
            <NuxtLink to="/login">로그인</NuxtLink>
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
  username: '',
  email: '',
  password: ''
})

const error = ref('')

const handleSignup = async () => {
  error.value = ''

  try {
    const response = await fetch(`${config.public.apiBase}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.error || '회원가입에 실패했습니다'
      return
    }

    alert('회원가입이 완료되었습니다!')
    router.push('/login')
  } catch (err) {
    error.value = '서버 연결에 실패했습니다'
  }
}
</script>

<style scoped>
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