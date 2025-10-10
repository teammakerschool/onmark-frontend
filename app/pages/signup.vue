<template>
  <div class="auth-page">
    <Navbar />
    
    <div class="auth-container">
      <div class="container">
        <div class="auth-card">
          <h2>계정 만들기</h2>
          <p class="subtitle">OnMark와 함께 사진을 안전하게 보호하세요</p>

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