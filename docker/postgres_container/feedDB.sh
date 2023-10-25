#!/usr/bin/env bash

echo ""
echo "Starting script..."
# create temporary directory for postgres in docker
# mkdir "/tmp/stat_temporary"

# copy your postgresql.conf to postgresql config location in docker
#cp /db_config/postgresql.conf /var/lib/postgresql/data/postgresql.conf

USER=mycontactsadmin #Nome do usuário de dados
DB=mycontacts #Nome do banco de dados

echo ""
echo "Criando e alimentando base de dados inicial..."
echo ""
# cria base, usuários e concede permissões, se necessário
psql -U $USER -c "create user postgres with password 'postgres'"

# Cria o banco de dados, se ele não existir
# Restore do banco de dados a partir do arquivo SQL

if psql -lqt | cut -d \| -f 1 | grep -qw "$DB"; then
  echo "O banco de dados '$DB' já existe."
else
  createdb -U $USER "$DB"
  echo "Banco de dados '$DB' criado com sucesso."
fi

psql -U $USER -d $DB -f /databases/mycontacts.sql

echo ""
echo "Base de dados criada com sucesso!"
echo ""
