FROM fedora:38
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN dnf upgrade -y
RUN dnf install -y \
    procps && \
    dnf module install -y \
    nodejs
RUN npm install -g npm@9.6.7 \
    @nestjs/cli