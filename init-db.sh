#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE "micro-user";
    CREATE DATABASE "micro-product";
EOSQL
