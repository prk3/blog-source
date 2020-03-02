#/bin/bash

X=50
Y=50

JPEG=60
WEBP=50

python ./crop.py $1 $2header-x.jpg 1920  570 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2header-l.jpg 1440  650 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2header-m.jpg 960  1000 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2header-s.jpg 480   550 --harea=$X --varea=$Y --jpeg-quality=$JPEG

python ./crop.py $1 $2header-x.webp 1920  570 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2header-l.webp 1440  650 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2header-m.webp 960  1000 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2header-s.webp 480   550 --harea=$X --varea=$Y --webp-quality=$WEBP

