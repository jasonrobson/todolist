namespace :graphql do
  desc 'Tasks for GraphQL'

  task update_schema: :environment do
    schema_text = GraphQL::Schema::Printer.print_schema(TodosapiSchema)

    file = File.open('metadata/schema.graphql', 'w')
    file.write(schema_text)
  rescue => err
    puts err
  end
end

