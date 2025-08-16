#!/bin/bash
# Preserve cultural and educational context while archiving
mkdir -p archive/$(date +%Y%m%d)
grep -E "(Te Reo|tikanga|kaitiaki|mahara|educational)" conversation.log > archive/$(date +%Y%m%d)/cultural-context.log
grep -E "(curriculum|assessment|learning)" conversation.log > archive/$(date +%Y%m%d)/educational-context.log
