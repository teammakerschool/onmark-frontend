<template>
  <div>
    <Navbar />
    
    <div class="dashboard-page">
      <div class="container">
        <div class="dashboard-header">
          <div>
            <h1>대시보드</h1>
            <p class="welcome-text">안녕하세요, {{ username }}님! 👋</p>
          </div>
          
          <NuxtLink to="/upload" class="btn btn-primary">
            ➕ 새 사진 업로드
          </NuxtLink>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-icon">📸</div>
            <div class="stat-info">
              <h3>{{ photos.length }}</h3>
              <p>총 사진</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🔒</div>
            <div class="stat-info">
              <h3>{{ photos.length }}</h3>
              <p>보호된 사진</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">💾</div>
            <div class="stat-info">
              <h3>{{ totalSize }}</h3>
              <p>총 용량</p>
            </div>
          </div>
        </div>

        <div class="photos-section">
          <h2>내 사진</h2>
          
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>불러오는 중...</p>
          </div>

          <div v-else-if="photos.length === 0" class="empty-state">
            <div class="empty-icon">📷</div>
            <h3>아직 업로드한 사진이 없습니다</h3>
            <p>첫 번째 사진을 업로드해보세요!</p>
            <NuxtLink to="/upload" class="btn btn-primary">
              사진 업로드하기
            </NuxtLink>
          </div>

          <div v-else class="photos-grid">
            <PhotoCard 
              v-for="photo in photos" 
              :key="photo.id"
              :photo="photo"
              @download="downloadPhoto"
              @delete="deletePhoto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const router = useRouter()

const photos = ref([])
const loading = ref(true)
const username = ref('')

// 로그인 확인 및 사용자 정보 가져오기
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('로그인이 필요합니다')
    router.push('/login')
    return
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  username.value = user.username || '사용자'
  
  fetchPhotos()
})

// 사진 목록 가져오기
const fetchPhotos = async () => {
  const token = localStorage.getItem('token')
  loading.value = true
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    
    if (response.ok) {
      photos.value = data.photos
    } else {
      console.error('사진 목록 조회 실패')
    }
  } catch (error) {
    console.error('서버 연결 실패:', error)
  } finally {
    loading.value = false
  }
}

// 총 용량 계산
const totalSize = computed(() => {
  const bytes = photos.value.reduce((sum, photo) => sum + photo.file_size, 0)
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
})

// 다운로드
const downloadPhoto = async (photo) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(
      `${config.public.apiBase}/api/photos/${photo.id}/download`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      alert('다운로드 실패')
      return
    }

    // Blob으로 변환
    const blob = await response.blob()
    
    // 다운로드 링크 생성
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = photo.original_filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    alert('다운로드 실패')
    console.error(error)
  }
}

// 삭제
const deletePhoto = async (photoId) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      alert('사진이 삭제되었습니다')
      fetchPhotos()
    }
  } catch (error) {
    alert('삭제 실패')
  }
}
</script>

<style scoped>
.dashboard-page {
  min-height: calc(100vh - 80px);
  padding: 40px 0;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 36px;
  color: #1F2937;
  margin-bottom: 8px;
}

.welcome-text {
  color: #6B7280;
  font-size: 18px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  font-size: 48px;
}

.stat-info h3 {
  font-size: 32px;
  font-weight: bold;
  color: #1F2937;
  margin-bottom: 4px;
}

.stat-info p {
  color: #6B7280;
  font-size: 14px;
}

.photos-section h2 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #1F2937;
}

.loading {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 5px solid #E5E7EB;
  border-top: 5px solid #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #1F2937;
  margin-bottom: 12px;
}

.empty-state p {
  color: #6B7280;
  margin-bottom: 24px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>