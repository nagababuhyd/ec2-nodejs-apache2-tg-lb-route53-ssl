https://medium.com/@a_farag/deploying-a-node-js-project-with-pm2-in-production-mode-fc0e794dc4aa
####################################################################################

steps
setup ec2
git clone https://github.com/nagababuhyd/ec2-nodejs-apache2/
cd ec2-nodejs-apache2
sudo apt update && sudo apt upgrade -y
# Install curl if missing
sudo apt install -y curl

# Add NodeSource repository for Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

node -v
npm -v

npm install -g pm2
pm2 start ecosystem.config.js

pm2 stop all

pm2 start my-app

pm2 logs
curl localhost:3000

enable port 22 80 3000 in security groups


################


install apache web server for multiple req acts as proxy and load balancer for nodejs app
access app with public ip

######################

install certbot for http url free ssl

##############################
get domain for app

in realtime after app works with apache2  to get domain name for app

create domain example.com
create a record

Name: myapp.example.com
Type: A
Value: <Public IP of your EC2>  or load balancer url
TTL: 300

myapp.example.com → myapp-alb-123456789.us-east-1.elb.amazonaws.com



##########################################
to get ssl https

but it is working with http i want ssl then?

🥈 Option 2 — AWS Certificate Manager (ACM)


#Go to AWS Certificate Manager (ACM) → Request public certificate

#Add your domain (myapp.example.com)

#Validate via DNS 

#(Route53 adds CNAME of ssl automatically)

#######################
Attach the certificate to: in load balancer listener 443
create alb
create target group 
add instances
🔹 Step 6 — Add HTTPS Listener (SSL Termination)
Go to your Load Balancer → Listeners tab.

Click Add listener → choose:

Protocol: HTTPS

Port: 443

Under Default action, select Forward to → your Target Group

Under SSL certificate, choose:

Certificate type: “From ACM”

Select the SSL certificate you created earlier (e.g., myapp.example.com)

Save.

##################################################################################




🔹 Step 7 — (Optional) Redirect HTTP → HTTPS

You can make your ALB automatically redirect port 80 → 443.

On the HTTP (80) listener:

Click Edit rule

Change action to:

Redirect to → HTTPS (port 443)


Save.





