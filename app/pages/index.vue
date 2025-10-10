<template>
  <div>
    <Navbar />
    
    <div class="hero">
      <div class="container">
        <h1 class="hero-title">사진을 안전하게 보호하세요</h1>
        <p class="hero-subtitle">
          OnMark의 비가시성 워터마크로 당신의 소중한 사진을 보호합니다
        </p>
        
        <div class="hero-buttons">
          <NuxtLink to="/signup" class="btn btn-primary btn-large">
            시작하기
          </NuxtLink>
          <NuxtLink to="/login" class="btn btn-secondary btn-large">
            로그인
          </NuxtLink>
        </div>

        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>안전한 보호</h3>
            <p>비가시성 워터마크로 사진을 보호합니다</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">☁️</div>
            <h3>클라우드 저장</h3>
            <p>언제 어디서나 안전하게 접근 가능합니다</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>빠른 처리</h3>
            <p>즉시 업로드하고 다운로드하세요</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero {
  padding: 80px 0;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  color: #1F2937;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 20px;
  color: #6B7280;
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 80px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.feature-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #1F2937;
}

.feature-card p {
  color: #6B7280;
  line-height: 1.6;
}
</style>