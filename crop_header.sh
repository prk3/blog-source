#/bin/bash

X=${X:-50}
Y=${Y:-50}

JPEG=${JPEG:-70}
WEBP=${WEBP:-80}

# normal density jpg
python ./crop.py $1 $2/header-xx-1x.jpg 2560  420 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-x-1x.jpg  1920  420 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-l-1x.jpg  1440  420 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-m-1x.jpg   960  480 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-s-1x.jpg   480  540 --harea=$X --varea=$Y --jpeg-quality=$JPEG

# double density jpg
python ./crop.py $1 $2/header-xx-2x.jpg 5120  840 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-x-2x.jpg  3840  840 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-l-2x.jpg  2880  840 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-m-2x.jpg  1920  960 --harea=$X --varea=$Y --jpeg-quality=$JPEG
python ./crop.py $1 $2/header-s-2x.jpg   960 1080 --harea=$X --varea=$Y --jpeg-quality=$JPEG

# normal density webp
python ./crop.py $1 $2/header-xx-1x.webp 2560  420 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-x-1x.webp  1920  420 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-l-1x.webp  1440  420 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-m-1x.webp  960   480 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-s-1x.webp  480   540 --harea=$X --varea=$Y --webp-quality=$WEBP

# double density webp
python ./crop.py $1 $2/header-xx-2x.webp 5120  840 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-x-2x.webp  3840  840 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-l-2x.webp  2880  840 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-m-2x.webp  1920  960 --harea=$X --varea=$Y --webp-quality=$WEBP
python ./crop.py $1 $2/header-s-2x.webp   960 1080 --harea=$X --varea=$Y --webp-quality=$WEBP
