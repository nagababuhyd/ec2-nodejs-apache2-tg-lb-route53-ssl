
in realtime we manually do same as instance 1 in instance2
create 1 target group add 2 ec2 instance there
attach to alb

create domain name
create a record with appname and point to lb as A type

create ssl as same as appname and onfigure cnames in domain that is it
nowu can access app with url
PENDING



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
working with ec2 ip
######################

🧩 2️⃣ Create Target Group (in AWS EC2 Console)
Register your EC2 instance → check ✅ next to it → click Include as pending below → Create target group
port 80 as apache uses 80

or 3000 based on request
#######################################

🌐 3️⃣ Create Application Load Balancer (ALB)
=
Scheme: Internet-facing

IP type: IPv4

Listeners:

HTTP → Port 80

(We’ll add HTTPS 443 later)

Select your VPC and public subnets

Create or select a security group:

Allow inbound ports 80 and 443

Under Default actions, choose:

Forward to → your Target Group (myapp-tg)

✅ Click Create Load Balancer

Wait until ALB status = “Active”.








access app with lb dns'📦 4️⃣ Test HTTP Access via ALB
######################################################


CREATE A DOMAIN''

🧭 5️⃣ Create a Domain (or use existing one)

Go to Route 53 → Hosted Zones → Create hosted zone

Domain: example.com (or use existing)

Inside the hosted zone, create a record:

Record name: myapp

Type: A (Alias)

Alias: Yes

Alias target: your ALB DNS name

✅ Result:

myapp.example.com → myapp-alb-123456789.us-east-1.elb.amazonaws.com


Now your domain is pointing to your Load Balancer.

Test:

curl http://myapp.example.com

###########################

🔒 6️⃣ Add SSL (HTTPS)

Step A: Request a certificate

Go to AWS Certificate Manager (ACM)

Click Request a certificate

Choose Request a public certificate

Add your domain name:

myapp.example.com


Validation method: DNS validation

ACM gives you a CNAME record to add in Route 53.

Click “Create record in Route 53”

Wait a few minutes → status becomes ✅ Issued


############################################

🔐 7️⃣ Attach SSL Certificate to ALB

Now attach the issued certificate to your ALB’s HTTPS listener.

Go to EC2 → Load Balancers → your ALB → Listeners tab

Add listener:

Protocol: HTTPS

Port: 443

Default action: Forward to your Target Group (myapp-tg)

Under SSL certificate, choose From ACM

Select your issued certificate (myapp.example.com)

Save → ALB updates to handle HTTPS.

✅ Now your ALB accepts HTTPS traffic with a valid SSL certificate.

###############################################################

🔁 8️⃣ (Optional) Redirect HTTP → HTTPS

You can configure ALB rules to auto-redirect all port 80 requests to port 443.

In the HTTP (80) listener:

Edit rule → Add action → Redirect to HTTPS (443)

Save

Now, all http://myapp.example.com → redirects to https://myapp.example.com.
###################




























