<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Procurar por nome"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Procurar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Contatos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(contact, index) in contacts"
          :key="index"
          @click="setActiveContact(contact, index)"
        >
          {{ contact.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllContacts">
        Remover todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentContact">
        <h4>Contatos</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ currentContact.name }}
        </div>
        <div>
          <label><strong>CPF:</strong></label> {{ currentContact.cpf }}
        </div>
        <div>
          <label><strong>E-mail:</strong></label> {{ currentContact.email }}
        </div>
        <div>
          <label><strong>Telefone:</strong></label> {{ currentContact.phone }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentContact.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/contacts/' + currentContact.id"
        >
          Editar
        </a>
      </div>
      <div v-else>
        <br />
        <p>Por favor clique no contato ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ContactDataService from "../services/ContactDataService";

export default {
  name: "contacts-list",
  data() {
    return {
      contacts: [],
      currentContact: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveContacts() {
      ContactDataService.getAll()
        .then(response => {
          this.contacts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveContacts();
      this.currentContact = null;
      this.currentIndex = -1;
    },

    setActiveContact(contact, index) {
      this.currentContact = contact;
      this.currentIndex = index;
    },

    removeAllContacts() {
      ContactDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      ContactDataService.findByName(this.name)
        .then(response => {
          this.contacts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveContacts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>