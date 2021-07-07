#!/bin/bash
set -e #fail on error
ls application
cd application
zip -r application.zip ./*
mv application.zip ../application.zip
cd ..
zip -r openGiraffes-store-nightly.zip application.zip metadata.json
mkdir workdir
mv application.zip workdir/application.zip
mv metadata.json workdir/metadata.json