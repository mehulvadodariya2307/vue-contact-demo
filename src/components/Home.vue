<template>
  <v-container class="my-3" style="overflow:hidden">
    <v-row class="text-center" >
      <v-subheader
        v-if="header"
        v-text="header"
      ></v-subheader>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-list three-line class="mx-5">
          <v-text-field
            solo
            label="Search contact"
            append-icon="mdi-magnify"
            v-model="searchText"
          ></v-text-field>
          <template v-if="items.length && !loading" >
            <div class="list-contact">
              <v-card  v-for="(item, index) in items" :key="index" class="my-3 my-3" rounded>
              
                <v-list-item
                  :key="item.id"
                  @click="clickItem(item.id)"
                  class="pl-0"
                >
                  <v-list-item-avatar rounded>
                    <v-img :src="item.image" class="profileImage"></v-img>
                  </v-list-item-avatar>
  
                  <v-list-item-content>
                    <v-list-item-title class="primary--text">{{item.firstName + ' ' + item.lastName}}</v-list-item-title>
                    <v-list-item-subtitle >{{'+91 ' + item.phoneNumber}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </template>
          <template v-if="!items.length && !loading">
            <v-row>
              <v-col cols="12" class="text-center">
                <h4 class="secondary--text">No Data</h4>
              </v-col>
            </v-row>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-if="loading" class="spinner">
      <v-col cols="12" class="fix-spinner">
          <v-progress-circular
            v-if="loading"
            :size="50"
            color="primary"
            indeterminate
           ></v-progress-circular>
      </v-col>
    </v-row>
    <v-footer  fixed class="footer">
        <v-row class="footer-btn text-center">
          <v-col cols="12">
            <router-link :to="{ name: 'add'}"><v-icon class="mr-2 edit-icon">{{ icons.mdiPlusCircle }}</v-icon></router-link>
          </v-col>
        </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import { mdiPlusCircle } from '@mdi/js'
  export default {
    name: 'Home',
    data: () => ({
      header: 'MY CONTACT',
      items: [],
      searchText:'',
      icons: {
            mdiPlusCircle
          },
      loading:false
    }),
    watch:{
      searchText(){
        this.searchTextApi();
      }
    },
    mounted(){
      this.loading= true
      this.axios.get('https://62886e217af826e39e60c1c5.mockapi.io/contacts').then((response) => {
        this.items = response.data;
        this.items.map((i) => {
          i.phoneNumber = i.phoneNumber.replaceAll('-','')
        })
        this.loading= false
      })
    },
    methods:{
      clickItem(id){
        this.$router.push({'name':'detail',params: { id: id }})
      },
      searchTextApi(){
        
        if(this.searchText.length > 0){
          this.axios.get('https://62886e217af826e39e60c1c5.mockapi.io/contacts?search='+this.searchText).then((response) => {
            this.items = response.data;
          })
        }
      }
    }
  }
</script>
<style scoped>
::v-deep.v-avatar{
  border-radius:0%;  
  height: 63px !important;
  min-width: 40px !important;
  width: 63px !important;
  margin: 0px !important;
  margin-right: 10px !important;
}
::v-deep.v-list-item__title{
   display: flex;
   align-items: flex-start; 
}
::v-deep.v-list-item__subtitle{
   display: flex !important;
   align-items: flex-start; 
}
::v-deep.v-list--three-line .v-list-item .v-list-item__content, .v-list-item--three-line .v-list-item__content{
  align-self: auto;
}
::v-deep .v-list--three-line .v-list-item, .v-list-item--three-line{
  min-height:auto
}
.footer {
  border-top: 2px solid !important;
  border-color: #929eaa1c !important;
  height:50px!important;
}
::v-deep .footer-btn {
  position:relative;
  bottom: 75%;
}
::v-deep .v-icon__svg{
  height: 40px !important;
  width: 40px !important;
}
::v-deep .edit-icon > .v-icon__svg {
  fill:#1976d2 !important
}
.list-contact {
  overflow: auto;
  max-height: 72vh;
}
.spinner {
  height:50vh !important
}
.fix-spinner {
  display: flex;
  align-items: center;
  justify-content: center
}
</style>