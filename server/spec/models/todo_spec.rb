require 'rails_helper'

describe Todo do
  let(:todo) { create(:todo) }

  describe 'validations' do
    subject { todo }
    it { should validate_presence_of(:name) }

    # We discourage using `validate_inclusion_of` with boolean columns. In
      # fact, there is never a case where a boolean column will be anything but
      # true, false, or nil, as ActiveRecord will type-cast an incoming value to
      # one of these three values. That means there isn't any way we can refute
      # this logic in a test. Hence, this will produce a warning:
      #
      #     it do
      #       should validate_inclusion_of(:imported).
      #         in_array([true, false])
      #     end
      #
      # The only case where `validate_inclusion_of` *could* be appropriate is
      # for ensuring that a boolean column accepts nil, but we recommend
      # using `allow_value` instead, like this:
    #it { should validate_inclusion_of(:completed), in: [true, false] }
    #it { expect(:completed).to be_boolean }

  end
end
