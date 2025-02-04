Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"  # Using Ubuntu 20.04 LTS as the base image

  # Configure a private network with a fixed IP address
  config.vm.network "private_network", ip: "192.168.56.10"

  # Sync the local project folder with the VM at /home/vagrant/app
  config.vm.synced_folder ".", "/home/vagrant/app"

  # Provision the VM using Ansible
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provision.yml"
  end
end

