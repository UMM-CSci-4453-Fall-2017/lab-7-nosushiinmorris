#!/bin/bash

db=$1

node first_buttons/loadData.js $db

node first_buttons/lab7server.js $db
