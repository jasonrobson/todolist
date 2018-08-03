require 'rails_helper'

describe Api::V1::TodosController do
  # esse create esta mexendo com o factory que ja foi criado para todo e traz alguns dados junto
  let(:todo) { create(:todo) }

  describe '#index' do

    subject { get :index  }

    it 'returns valid JSON' do
      body = JSON.parse(subject.body)
      puts 'fafafafa'

      puts todo.name
      puts todo.completed
      #inserir os dados do todo criado na variavel let na bd


      #verificar se os dados trazidos pro index sao os que eu inseri na bd anteriormente
    end
  end
end
