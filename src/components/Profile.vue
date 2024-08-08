<template>
    <div class="profile-container">
      <div class="card">
        <h3>Profile</h3>
        <div class="profile-content">
          <div class="round-avatar">
            <img :src="user.image" alt="User Image" />
          </div>
          <div class="user-details">
            <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Gender:</strong> {{ user.gender }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import {ref, onMounted} from 'vue';

export default {
  name: 'ProfileComponent',
  
  setup(){
    const user = ref({ });
    const errorMsg = ref('');

    onMounted(() =>{

        const userDetails = localStorage.getItem('user');

        if(userDetails){

        user.value = JSON.parse(userDetails);

        }else{
            errorMsg.value = 'No user data found';
        }
    });

   return {
    user,
    errorMsg,
   };
  },
 
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  text-align: center;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

.profile-content {
  display: flex;
  align-items: center;
}

.round-avatar {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.round-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex-grow: 1;
  text-align: left;
}

.user-details p {
  margin: 5px 0;
  color: #555;
}

.user-details strong {
  color: #333;
}
</style>
