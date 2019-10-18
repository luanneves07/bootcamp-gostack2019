# rocket_seat-boot_camp
Repositorio criado com o objetivo de manter os projetos abordados na bootCamp 2019 pela rocketSeat

# Instruções para instalação do Docker no linux Mint 19
### Instala pacotes necessários para certificado
sudo apt update && sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
### Adiciona repositório Bionic (Disponível para linux mint)
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
### Atualiza e instala o Docker
sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io
### Adiciona o usuário no grupo docker para não ser necessário rodar como root
sudo usermod -aG docker $USER
### Necessário para finalizar a instalação
reboot
