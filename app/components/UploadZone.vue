<template>
  <div 
    class="upload-zone"
    :class="{ 'dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileSelect"
      accept="image/*"
      style="display: none"
    >

    <div class="upload-content">
      <div class="upload-icon">📤</div>
      <h3>사진을 업로드하세요</h3>
      <p>드래그 앤 드롭 또는 클릭하여 선택</p>
      <button @click="$refs.fileInput.click()" class="btn btn-primary">
        파일 선택
      </button>
      
      <div v-if="selectedFile" class="selected-file">
        <p>선택된 파일: {{ selectedFile.name }}</p>
        <button @click="uploadFile" class="btn btn-primary">
          업로드 시작
        </button>
      </div>

      <div v-if="uploading" class="upload-progress">
        <div class="spinner"></div>
        <p>워터마크 적용 중...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['upload-success'])

const fileInput = ref(null)
const selectedFile = ref(null)
const isDragging = ref(false)
const uploading = ref(false)

const config = useRuntimeConfig()

// 파일 선택
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  } else {
    alert('이미지 파일만 업로드 가능합니다')
  }
}

// 드래그 앤 드롭
const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
  } else {
    alert('이미지 파일만 업로드 가능합니다')
  }
}

// 업로드
const uploadFile = async () => {
  if (!selectedFile.value) return

  uploading.value = true

  const formData = new FormData()
  formData.append('photo', selectedFile.value)

  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${config.public.apiBase}/api/photos/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || '업로드 실패')
      uploading.value = false
      return
    }

    alert('✅ 워터마크가 적용되어 업로드되었습니다!')
    selectedFile.value = null
    fileInput.value.value = ''
    uploading.value = false
    
    emit('upload-success')
  } catch (error) {
    alert('서버 연결에 실패했습니다')
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-zone {
  border: 3px dashed #D1D5DB;
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  background: white;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-zone.dragging {
  border-color: #4F46E5;
  background: #EEF2FF;
}

.upload-content {
  pointer-events: none;
}

.upload-content button {
  pointer-events: all;
}

.upload-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.upload-zone h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #1F2937;
}

.upload-zone p {
  color: #6B7280;
  margin-bottom: 24px;
}

.selected-file {
  margin-top: 24px;
  padding: 20px;
  background: #F3F4F6;
  border-radius: 8px;
}

.selected-file p {
  margin-bottom: 12px;
  color: #374151;
  font-weight: 500;
}

.upload-progress {
  margin-top: 24px;
  padding: 20px;
  background: #EEF2FF;
  border-radius: 8px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  border: 4px solid #E5E7EB;
  border-top: 4px solid #4F46E5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>