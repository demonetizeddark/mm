function FindProxyForURL(url, host) {
 
// If the hostname matches, send direct.
    if (dnsDomainIs(host, "burtonschools.org") ||
        shExpMatch(host, "(*.burtonschools.org|burtonschools.org)"))
        return null;
    if (dnsDomainIs(host, "besbullpups.org") ||
        shExpMatch(host, "(*.besbullpups.org|besbullpups.org)"))
        return null;
    if (dnsDomainIs(host, "oakgrovestars.org") ||
        shExpMatch(host, "(*.airast.org|airast.org)"))
        return null;
    if (dnsDomainIs(host, "buckleyelementary.org") ||
        shExpMatch(host, "(*.buckleyelementary.org|buckleyelementary.org)"))
        return null;
    if (dnsDomainIs(host, "summitcharter.org") ||
        shExpMatch(host, "(*.summitcharter.org|summitcharter.org)"))
        return null;
    if (dnsDomainIs(host, "summitlombardi.org") ||
        shExpMatch(host, "(*.summitlombardi.org|summitlombardi.org)"))
        return null;
    if (dnsDomainIs(host, "bmsbulldogs.org") ||
        shExpMatch(host, "(*.bmsbulldogs.org|bmsbulldogs.org)"))
        return null;
    if (dnsDomainIs(host, "airast.org") ||
        shExpMatch(host, "(*.airast.org|airast.org)"))
        return null;
    if (dnsDomainIs(host, "apple.com") ||
        shExpMatch(host, "(*.apple.com|apple.com)"))
        return null;
    if (dnsDomainIs(host, "icloud.com") ||
        shExpMatch(host, "(*.icloud.com|icloud.com)"))
        return null;
    if (dnsDomainIs(host, "ssl.com") ||
        shExpMatch(host, "(*.ssl.com|ssl.com)"))
        return null;
    if (dnsDomainIs(host, "zoom.us") ||
        shExpMatch(host, "(*.zoom.us|zoom.us)"))
        return null;
    if (dnsDomainIs(host, "seesaw.me") ||
        shExpMatch(host, "(*.seesaw.me|seesaw.me)"))
        return null;
    if (dnsDomainIs(host, "proctor.io") ||
        shExpMatch(host, "(*.proctor.io|proctor.io)"))
        return null;
    if (dnsDomainIs(host, "proctorio.com") ||
        shExpMatch(host, "(*.proctorio.com|proctorio.com)"))
        return null;
    if (dnsDomainIs(host, "getproctorio.com") ||
        shExpMatch(host, "(*.getproctorio.com|getproctorio.com)"))
        return null;
    if (dnsDomainIs(host, "proctoriosupport.com") ||
        shExpMatch(host, "(*.proctoriosupport.com|proctoriosupport.com)"))
        return null;
    if (dnsDomainIs(host, "proctor.in") ||
        shExpMatch(host, "(*.proctor.in|proctor.in)"))
        return null;
    if (dnsDomainIs(host, "proctorauth.com") ||
        shExpMatch(host, "(*.proctorauth.com|proctorauth.com)"))
        return null;
    if (dnsDomainIs(host, "proctorcollect.com") ||
        shExpMatch(host, "(*.proctorcollect.com|proctorcollect.com)"))
        return null;
    if (dnsDomainIs(host, "proctordata.com") ||
        shExpMatch(host, "(*.proctordata.com|proctordata.com)"))
        return null;

// If the URI matches https://*.google.com/* then route traffic
// directly to the Internet.
// if (isPlainHostName(host) || 
//   shExpMatch(url,"https://*.google.com/*") ||
//   return null;

// If the protocol or URL matches, send direct.
//    if (url.substring(0, 4)=="ftp:" ||
//        shExpMatch(url, "http://abcdomain.com/folder/*"))
//        return null;
 
// If the requested website is hosted within the internal network, send direct.
  if (isPlainHostName(host) ||
      shExpMatch(host, "*.local") ||
      isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0"))
      return null;
 
// If the IP address of the local machine is within a defined
// subnet, send to a specific proxy.

// if (isInNet(myIpAddress(), "10.200.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.201.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.203.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.204.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.205.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.206.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.208.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.209.0.0", "255.255.0.0"))
//  return null;
// if (isInNet(myIpAddress(), "10.210.0.0", "255.255.0.0"))
//  return null;

// If the URI matches https://*.airast.org/* then route traffic
// directly to the Internet.
// if (isPlainHostName(host) || 
//   shExpMatch(url,"https://*.airast.org/*") ||
//   return null;

// If the hostname matches, send direct.
//    if (dnsDomainIs(host, "airast.org") ||
//       shExpMatch(host, "(*.airast.org|airast.org)"))
//       return null;
//    if (dnsDomainIs(host, "casper.burtonschools.org"))
//       return null;
 
// DEFAULT RULE: All other traffic, use below proxies, in fail-over order.
//  return "PROXY 4.5.6.7:8080; PROXY 7.8.9.10:8080";
    return "PROXY 75.128.77.238:13894";

}
