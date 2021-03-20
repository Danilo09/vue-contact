<template>
  <div v-if="currentContact" class="edit-form">
    <h4>Contato</h4>
    <form>
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name"
          v-model="currentContact.name"
        />
      </div>
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" class="form-control" id="cpf"
          v-model="currentContact.cpf"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentContact.email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Telefone</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentContact.phone"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentContact.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentContact.published"
      @click="updatePublished(false)"
    >
      Não Publicado
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publicado
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteContact"
    >
      Deletar
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateContact"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor clique no contato ...</p>
  </div>
</template>

<script>
import ContactDataService from "../services/ContactDataService";

export default {
  name: "contact",
  data() {
    return {
      currentContact: null,
      message: ''
    };
  },
  methods: {
    getContact(id) {
      ContactDataService.get(id)
        .then(response => {
          this.currentContact = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentContact.id,
        name: this.currentContact.name,
        cpf: this.currentContact.cpf,
        email: this.currentContact.email,
        phone: this.currentContact.phone,
        published: status
      };

      ContactDataService.update(this.currentContact.id, data)
        .then(response => {
          this.currentContact.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateContact() {
      ContactDataService.update(this.currentContact.id, this.currentContact)
        .then(response => {
          console.log(response.data);
          this.message = 'Contato foi atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteContact() {
      ContactDataService.delete(this.currentContact.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "contacts" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getContact(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>