<template>
    <v-container class="my-3">
      <v-main v-if="!loading">
        <router-link class="pa-0" :to="{ name: 'home'}">
          <v-icon class="">{{ icons.mdiChevronLeft }}</v-icon>BACK
        </router-link>
        <v-row class="text-center">
          <v-col cols="12">
            <v-avatar v-if="contactInfo.firstName" class="contact-avatar">
                <span class="primary--text text-h5">{{ contactInfo.firstName.charAt(0).toUpperCase()+''+ contactInfo.lastName.charAt(0).toUpperCase()}}</span>
              </v-avatar>
          </v-col>
        </v-row>
        <v-list v-if="!loading">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="primary--text">First Name</v-list-item-subtitle>
              <v-list-item-title class="secondary--text">{{contactInfo.firstName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="primary--text">Last Name</v-list-item-subtitle>
              <v-list-item-title class="secondary--text">{{contactInfo.lastName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="primary--text">Phone Number</v-list-item-subtitle>
              <v-list-item-title class="secondary--text">+91 {{contactInfo.phoneNumber}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="primary--text">Email Address</v-list-item-subtitle>
              <v-list-item-title class="secondary--text">{{contactInfo.emailAddress}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-main> 
      <v-main v-else class="spinner fix-spinner">
        <v-progress-circular
            v-if="loading"
            :size="50"
            color="primary"
            indeterminate
            class=""
           ></v-progress-circular>
      </v-main>
      <v-footer fixed class="footer">
        <v-row class="footer-btn">
          <v-col cols="12 text-center">
            <router-link :to="{ name: 'edit' , params : { id: $route.params.id }}"><v-icon class="mr-2 edit-icon">{{ icons.mdiPencilCircle }}</v-icon></router-link>
            <v-icon class="delete-icon" @click="dialog = true">{{ icons.mdiDeleteCircle }}</v-icon>
          </v-col>
        </v-row>
      </v-footer>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Delete Contact ?
          </v-card-title>
          <v-card-text>Are you sure you want to delete this contact ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="deleteContact"
            >
              Delete
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="dialog = false"
            >
              Cancle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>
<script>
import { mdiChevronLeft, mdiPencilCircle, mdiDeleteCircle } from '@mdi/js'
  export default {
    name: 'Detail',
    data(){
        return{
            contactInfo:[],
            icons: {
              mdiChevronLeft,
              mdiPencilCircle,
              mdiDeleteCircle
            },
            dialog:false,
            loading:false
        }
    },
    mounted(){
      this.loading = true
      this.axios.get('https://62886e217af826e39e60c1c5.mockapi.io/contacts/'+this.$route.params.id).then((response) => {
        this.contactInfo = response.data;
        this.contactInfo.phoneNumber = this.contactInfo.phoneNumber.replaceAll('-','')
        this.loading = false
      })
    },
    methods:{
        getShortLetter (val) {
            if (val) {
                const matches = val.toUpperCase().match(/\b(\w)/g)
                if (matches?.length >= 2) {
                    return matches[0] + matches[1]
                } else {
                    return matches?.join('')
                }
            }
        },
        deleteContact () {
          this.axios.delete('https://62886e217af826e39e60c1c5.mockapi.io/contacts/'+this.$route.params.id).then((response) => {
            console.log(response)
            this.$toast.success('Contact deleted success')
            this.$router.push({'name':'home'})
          })
        }
    }
  }

</script>
<style scoped>
.v-avatar {
  height: 140px !important;
  min-width: 140px !important;
  border: 5px solid !important;
  border-color: #929eaa1c !important;
  width: 130px !important;
}
.footer {
  border-top: 2px solid !important;
  border-color: #929eaa1c !important;
  height:50px!important;
}
.footer-btn {
  position: relative;
  bottom: 75%;
}
::v-deep.edit-icon > .v-icon__svg {
  fill:#1976d2 !important;
  height: 40px !important;
  width: 40px !important;
}
::v-deep.delete-icon > .v-icon__svg {
  height: 40px !important;
  width: 40px !important;
  fill:red !important
}
.v-application a {
  text-decoration:none;
  color:grey
}
.spinner {
  height: 80vh !important
}
.container {
  height: 80vh
}
::v-deep .fix-spinner > .v-main__wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  height:80vh;
}
</style>