<template>
  <v-container class="my-3">
    <router-link v-if="$route.name == 'add'" class="pa-0" :to="{ name: 'home'}">
        <v-icon class="">{{ icons.mdiChevronLeft }}</v-icon>BACK
    </router-link>
    <router-link v-if="$route.name == 'edit'" class="pa-0" :to="{ name: 'detail' , params:{ id: $route.params.id}}">
        <v-icon class="">{{ icons.mdiChevronLeft }}</v-icon>BACK
    </router-link>
    <v-row class="text-center" v-if="$route.name == 'edit'">
        <v-col cols="12">
            <v-avatar v-if="contact.firstName" class="contact-avatar">
                <span class="primary--text text-h5">{{ contact.firstName.charAt(0).toUpperCase()+''+ contact.lastName.charAt(0).toUpperCase()}}</span>
            </v-avatar>
        </v-col>
    </v-row>
    <v-row class="text-center" v-if="$route.name == 'add'">
      <v-col cols="12">
        <h2 class="secondary--text">Add contact</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form>
            <v-row>
              <v-col cols="12" class="pt-3 pb-0">
                <label class="primary--text">First Name</label>
                <v-text-field class="pa-0" v-model="$v.contact.firstName.$model" @blur="$v.contact.firstName.$touch()"></v-text-field>
                <span class="errorMessage" v-if="$v.contact.firstName.$error && !$v.contact.firstName.required">Firstname is required</span>
              </v-col>
              <v-col cols="12" class="pt-0 pb-0">
                <label class="primary--text">Last Name</label>
                <v-text-field class="pa-0" v-model="$v.contact.lastName.$model" @blur="$v.contact.lastName.$touch()"></v-text-field>
                <span class="errorMessage" v-if="$v.contact.lastName.$error && !$v.contact.lastName.required">Lastname is required</span>
              </v-col>
              <v-col cols="12" class="pt-0 pb-0">
                <label class="primary--text">Phone Number</label>
                <v-text-field class="pa-0" v-model="$v.contact.phoneNumber.$model" @blur="$v.contact.phoneNumber.$touch()"></v-text-field>
                <span class="errorMessage" v-if="$v.contact.phoneNumber.$error && !$v.contact.phoneNumber.required">Phone number is required</span>
                <span class="errorMessage" v-else-if="$v.contact.phoneNumber.$error && !$v.contact.phoneNumber.numeric">Phone number is not numeric</span>
                <span class="errorMessage" v-else-if="$v.contact.phoneNumber.$error && !$v.contact.phoneNumber.numeric">Please enter a number</span>
                <span class="errorMessage" v-else-if="$v.contact.phoneNumber.$error && !$v.contact.phoneNumber.minLength">Please enter exact 10 digit</span>
                <span class="errorMessage" v-else-if="$v.contact.phoneNumber.$error && !$v.contact.phoneNumber.maxLength">Please enter exact 10 digit</span>
              </v-col>
              <v-col cols="12" class="pt-0 pb-0">
                <label class="primary--text">Email Address</label>
                <v-text-field class="pa-0" v-model="$v.contact.emailAddress.$model" @blur="$v.contact.emailAddress.$touch()"></v-text-field>
                <span class="errorMessage" v-if="$v.contact.emailAddress.$error && !$v.contact.emailAddress.required">Email address is required</span>
                <span class="errorMessage" v-else-if="$v.contact.emailAddress.$error && !$v.contact.emailAddress.email">Email address is not valid</span>
              </v-col>
            </v-row>
        </v-form>
      </v-col>
    </v-row>
     <v-footer  fixed class="footer">
      <v-row class="edit-footer-btn text-center">
        <v-col cols="12">
            <v-btn icon  type="submit"  @click="saveContact">
                <v-icon class="update-button">{{ icons.mdiCheckCircle }}</v-icon>
            </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script>
import {
    mdiPencilCircle,
    mdiDeleteCircle,
    mdiChevronLeft,
    mdiPlusCircle,
    mdiCheckCircle
  } from '@mdi/js'
import { required, email, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
  export default {
    name: 'Detail',
    data(){
        return{
            contact: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                emailAddress: ''
            },
            icons: {
              mdiPencilCircle,
              mdiDeleteCircle,
              mdiChevronLeft,
              mdiPlusCircle,
              mdiCheckCircle
            },
        }
    },
    created(){
        if (this.$route.params.id) {
            this.axios.get('https://62886e217af826e39e60c1c5.mockapi.io/contacts/'+this.$route.params.id).then((response) => {
                this.contact = response.data
                this.contact.phoneNumber = this.contact.phoneNumber.replaceAll('-','')
            })
        }
    },
    validations () {
        return {
            contact: {
                firstName: { required }, 
                lastName: { required }, 
                phoneNumber: { 
                    required,
                    numeric,
                    minLength: minLength(10),
                    maxLength: maxLength(10)
                }, 
                emailAddress: { 
                    required ,
                    email
                }
            }
        }
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
        saveContact() {
            this.$v.contact.$touch()
            if(!this.$v.contact.$invalid) {
                if(this.$route.params.id) {
                    this.axios.put('https://62886e217af826e39e60c1c5.mockapi.io/contacts/'+this.$route.params.id,this.contact).then(() => {
                        this.$toast.success('Contact updated success')
                        this.$router.push({name:'detail', params: this.$route.params.id})
                    })
                } else {
                    this.axios.post('https://62886e217af826e39e60c1c5.mockapi.io/contacts',this.contact).then(() => {
                        this.$toast.success('Contact added success')
                        this.$router.push({'name':'home'})
                    })
                }
            } else {
                this.$toast.error('validation error...!')
            }
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
  border: 2px solid !important;
  border-color: #929eaa1c !important;
  height:50px!important;
}
.edit-footer-btn {
  position:relative;
  bottom: 75%;
}
.update-button {
  height: 40px !important;
  width: 40px !important;
}
::v-deep.update-button > .v-icon__svg {
  fill:#1976d2 !important;
  height: 40px !important;
  width: 40px !important;
}
.errorMessage {
    color:red;
}
.v-application a {
  text-decoration:none;
  color:grey
}
</style>