/// <reference types="Cypress" />

beforeEach(() => {
	cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function () {
	it('verifica o título da aplicação', function () {
		cy.title().should('include', 'Central de Atendimento ao Cliente TAT')
	})
	it('preenche os campos obrigatórios e envia o formulário', function () {
		cy.get('#firstName').type('Fulano')
		cy.get('#lastName').type('de Tal')
		cy.get('#email').type('teste@teste.com')
		cy.get('#open-text-area').type('Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.', { delay: 0 })
		cy.get('.button').click()
		cy.get('.success').should('contain', 'Mensagem enviada com sucesso.')
	})
	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
		cy.get('#firstName').type('Fulano')
		cy.get('#lastName').type('de Tal')
		cy.get('#email').type('teste.com')
		cy.get('#open-text-area').type('Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.', { delay: 0 })
		cy.get('.button').click()
		cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
	})
	it('valida campo número de telefone com valor não-numérico', () => {
		cy.get('#phone')
			.type('teste')
			.should('have.value', '')
	})
	it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
		cy.get('#firstName').type('Fulano').should('have.value', 'Fulano').clear().should('have.value', '')
		cy.get('#lastName').type('de Tal').should('have.value', 'de Tal').clear().should('have.value', '')
		cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
		cy.get('#phone').type('75999999999').should('have.value', '75999999999').clear().should('have.value', '')
	})
	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
		cy.get('.button').click()
		cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
	})
	it('envia o formuário com sucesso usando um comando customizado', () => {
		cy.fillMandatoryFieldsAndSubmit()

		cy.get('.success').should('contain', 'Mensagem enviada com sucesso.')
	})
	it('substitundo o cy.get pelo cy.contains para clicar no botão', () => {
		cy.get('#firstName').type('Fulano')
		cy.get('#lastName').type('de Tal')
		cy.get('#email').type('teste@teste.com')
		cy.get('#open-text-area').type('Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.', { delay: 0 })
		cy.contains('button', 'Enviar').click()
		cy.get('.success').should('contain', 'Mensagem enviada com sucesso.')
	})
	it('seleciona um produto (YouTube) por seu texto', () => {
		cy.get('select').select('YouTube')
			.should('have.value', 'youtube')
	})
	it('seleciona um produto (Mentoria) por seu valor (value)', () => {
		cy.get('select').select('mentoria')
			.should('have.value', 'mentoria')
	})
	it('seleciona um produto (Blog) por seu índice', () => {
		cy.get('select').select(1)
			.should('have.value', 'blog')
	});
	it('marca o tipo de atendimento "Feedback"', () => {
		cy.get('[type="radio"]').check('feedback')
			.should('be.checked')
	})
	it('marca cada tipo de atendimento', () => {
		cy.get('[type="radio"]').check('ajuda')
			.should('be.checked')
		cy.wait(1000)
		cy.get('[type="radio"]').check('elogio')
			.should('be.checked')
		cy.wait(1000)
		cy.get('[type="radio"]').check('feedback')
			.should('be.checked')
	})
	it('marca ambos checkboxes, depois desmarca o último', () => {
		cy.get('[type="checkbox"]')
			.check()
			.last()
			.uncheck()
			.should('not.be.checked')
	})
	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		cy.get('[type="checkbox"]').check('phone')
		cy.get('.button').click()

		cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
	})
	it('seleciona um arquivo da pasta fixtures', () => {
		cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json')
			.should(function($input) {
				expect($input[0].files[0].name).to.eq('example.json')
		})
	})
	it('seleciona um arquivo simulando um drag-and-drop', () => {
		cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
			.should(function($input) {
				expect($input[0].files[0].name).to.eq('example.json')
		})
	})
	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
		cy.fixture('example.json').as('file')
		cy.get('input[type="file"]')
			.selectFile('@file')
			.should(function($input) {
				expect($input[0].files[0].name).to.eq('example.json')
		}) 
	})
	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
		cy.get('#privacy a').should('have.attr', 'target', '_blank')
	})
	it('', () => {
		cy.get('#privacy a')
			.invoke('removeAttr', 'target')
			.click()

		cy.contains('Talking About Testing').should('be.visible')
	})
})