#!/bin/sh
gulp build
gulp deploy
ant -f ../../build.xml redeploy-angforms
