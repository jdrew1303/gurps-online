#!/usr/bin/env bash
mongoimport --db gurps-online --collection advantages --drop --file seed/advantages.json
mongoimport --db gurps-online --collection skills --drop --file seed/skills.json
mongoimport --db gurps-online --collection postures --drop --file seed/posture.json
mongoimport --db gurps-online --collection melees --drop --file seed/melee.json