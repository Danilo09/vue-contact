<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="contact.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          class="form-control"
          id="cpf"
          required
          v-model="contact.cpf"
          name="cpf"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="contact.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Telefone</label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="contact.phone"
          name="phone"
        />
      </div>

      <button @click="saveContact" class="btn btn-success">Salvar</button>
    </div>

    <div v-else>
      <h4>Cadastrado com sucesso!</h4>
      <button class="btn btn-success" @click="newContact">Adicionar</button>
    </div>
  </div>
</template>

<script>
import ContactDataService from "../services/ContactDataService";

export default {
  name: "add-contact",
  data() {
    return {
      contact: {
        id: null,
        name: "",
        cpf: "",
        email: "",
        phone: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveContact() {
      var data = {
        name: this.contact.name,
        cpf: this.contact.cpf,
        email: this.contact.email,
        phone: this.contact.phone
      };

      ContactDataService.create(data)
        .then(response => {
          this.contact.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newContact() {
      this.submitted = false;
      this.contact = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>